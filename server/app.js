
const { Pool, Client } = require('pg')
const app = require('express')()
const cors = require('cors')
const bodyParser = require('body-parser') 
const jwt = require('jwt-simple')

const AS_NUMBER = 'format as number'
const AS_STRING = 'format as string'

const secret = '0e678c9eb834f18154b55b0163763acc'

app.use(cors())
app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())

const performQuery = (queryStr, resolve, reject) => {
  const pool = new Pool()
  pool.query(queryStr, (err, result) => {
    if (result) {
      resolve &&
        resolve(result.rows, result.rowCount)
    } else {
      reject &&
        reject(err, result)
    }
    pool.end()
  })
}

app.get('/plan', (req, res) => {
  const queryStr = 'SELECT gid, shbando, shthua, dtpl, sonha, tenduong, phuong'
                  + ' thanhpho, tinh, ST_asGeoJSON(geom) as geo'
                  + ' FROM thuadat'
                  + ' WHERE shbando=' + (Number(req.query.msto) || 0)
                  + ' AND shthua=' + (Number(req.query.msthua) || 0)

  performQuery(queryStr, (obj) => res.json(obj))
})

app.get('/plan/features/:featureId', (req, res) => {
  const queryStr = 'SELECT gid, shbando, shthua, dtpl, sonha, tenduong, phuong'
                  + ' thanhpho, tinh, ST_asGeoJSON(geom) as geo'
                  + ' FROM thuadat'
                  + ' WHERE gid=' + (Number(req.params.featureId) || 0)

  performQuery(queryStr, (obj) => res.json(obj))
})

app.get('/certificate', (req, res) => {
  const role = getLoggedRole(req)
  const shortInfo = 'c.machu, c.ten, d.shgiaycn,'
  const fullInfo = shortInfo
                  + ' c.loaichu, c.nam, c.sogiayto, c.ngaycap,'
                  + 'c.diachi, c.quoctich, '
  const additionalInfo = (role===1||role===2) ? fullInfo : shortInfo
  const val = req.query.value
  const q = req.query.kind === 'certiNumber'
            ? buildCertificateQueryByCertificateNumber(val, additionalInfo)
            : buildCertificateQueryByOwnerId(val, additionalInfo)

  performQuery(q, (obj) => res.json(obj), true)
})

app.get('/certificate/:certId', (req, res)=>{
  if ( ! isLoggedAsAdmin(req)) {
    res.json({code: 403})
    return
  }
  const id = InputHandler.format(req.params.certId, AS_STRING)
  fetchCertificateById(
    id,
    obj => res.json({code: 200, payload: obj}),
    () => res.json({code: 500})
  )
})

fetchCertificateById = (id, onDone, onErr) => {
  let main = undefined
  let pusers = undefined
  let plans = undefined
  const main_q = 'SELECT * FROM giaychungnhan WHERE shgiaycn=\''+id+'\''
  const pusers_q = 'SELECT c.machu, c.ten'
                  + ' FROM chusudung_giaychungnhan b'
                  + ' LEFT JOIN chusudung c ON c.machu = b.machu'
                  + ' WHERE b.shgiaycn=\''+id+'\''
  const plans_q = 'SELECT gid, shthua, shbando FROM thuadat'
                  + ' WHERE shgiaycn=\''+id+'\''

  packResult = () => {
    if (typeof(pusers) === 'undefined')
      return
    if (typeof(plans) === 'undefined')
      return
    main.pusers = pusers
    main.plans = plans
    onDone(main)
  }

  performQuery(main_q, (rows, nrow) => {
    if (nrow != 1) {
      onErr && onErr()
      return
    }
    main = convertToDto(rows[0])
    performQuery(pusers_q, (rows) => {
      pusers = rows
      packResult()
    })
    performQuery(plans_q, (rows) => {
      plans = rows
      packResult()
    })
  }, () => {onErr && onErr()})
}

const buildCertificateQueryByCertificateNumber = (value, additionalInfo) => {
  return buildCertificateCoreQuery(additionalInfo)
    + ' WHERE d.shgiaycn=\'' + value + '\''
}

const buildCertificateQueryByOwnerId = (value, additionalInfo) => {
  return buildCertificateCoreQuery(additionalInfo)
    + ' WHERE c.sogiayto=\'' + value + '\''
}

const buildCertificateCoreQuery = additionalInfo => {
  return 'SELECT ' + additionalInfo
            + ' d.gid, d.shbando, d.shthua, d.dtpl, d.sonha, d.tenduong,'
            + ' d.phuong, d.thanhpho, d.tinh, ST_asGeoJSON(geom) as geo'
            + ' FROM chusudung c'
            + ' LEFT JOIN chusudung_giaychungnhan s ON s.machu = c.machu'
            + ' LEFT JOIN thuadat d ON d.shgiaycn = s.shgiaycn'
}

app.put('/certificate', (req, res) => {
  const bodyStr = InputHandler.format(JSON.stringify(req.body), AS_STRING)
  let body = JSON.parse(bodyStr)
  if (body.goodUntil)
    body.goodUntil = new Date(body.goodUntil)
  if (body.signDate)
    body.signDate = new Date(body.signDate)
  const pairArray = convertPayload(body, certiKeyMap, certiNumberFields, [])
  const q = buildUpdateQuery(
    pairArray,
    'giaychungnhan',
    'shgiaycn=\''+body.id+'\''
  )
  performQuery(q, (_, affectedRows)=>{
    if (affectedRows !== 1) {
      res.json(SERVER_ERROR_PAYLOAD)
      return
    }
    updatePlansInCertificate(body)
    updatePusersInCertificate(body)
    res.json({SUCCESS_PAYLOAD})
  }, ()=>{res.json(SERVER_ERROR_PAYLOAD)})
})

const SERVER_ERROR_PAYLOAD = {code: 500}
const SUCCESS_PAYLOAD = {code: 200}

const certiKeyMap = {
  goodUntil: 'thoihansudung',
  signDate: 'ngayki',
  provider: 'coquancap',
  privateArea: 'dtrieng',
  publicArea: 'dtchung',
  targetOfUse: 'mucdichsudung',
  sourceOfUse: 'nguongocsudung'
}
const certiNumberFields = {
  privateArea: true,
  publicArea: true
}

updatePlansInCertificate = certiPayload => {
  const clean_q = 'UPDATE thuadat SET shgiayto=null'
                  + ' WHERE shgiayto=\''+certiPayload.id+'\''
  //performQuery(clean_q)
  console.log(clean_q)
  if (certiPayload.plans && certiPayload.length > 0) {
    const planIds = '(' + certiPayload.join(',') + ')'
    const attach_q = 'UPDATE thuadat SET shgiayto=\''+certiPayload.id+'\''
            + ' WHERE gid IN ' + planIds
  //performQuery(attach_q)
  console.log(attach_q)
  }
}

updatePusersInCertificate = payload => {
  const clean_q = 'DELETE FROM chusudung_giaychungnhan'
                + ' WHERE shgiaycn=\''+payload.id+'\''
  //performQuery(clean_q)
  console.log(clean_q)
  if (payload.pusers && payload.pusers.length > 0) {
    let valuePhase = payload.pusers.map(puserId => {
      return "('"+puserId+"', '"+payload.id+"')"
    }).join(',')
    const insert_q = 'INSERT INTO chusudung_giaychungnhan(machu, shgiaycn) '
                    + valuePhase
    //performQuery(insert_q)
    console.log(insert_q)
  }
}

app.get('/government-doc', (req, res) => {
  const q = 'SELECT sohieu, noidung, link FROM vanbannhanuoc'
  performQuery(q, objs => res.json(objs), true)
})

app.get('/account', (req, res) => {
  if ( ! isLoggedAsAdmin(req)) {
    res.json({code: 403})
    return
  }
  const q = 'SELECT id, username, hoten, cmnd, diachi, chucvu'
          + ' FROM taikhoan'
          + ' ORDER BY username'
  performQuery(q, objs => res.json(objs.map(convertToDto)), true)
})

const convertToDto = obj => {
  let dto = {}
  let key
  Object.keys(obj).forEach(e => {
    key = dtoKeyMap[e] ? dtoKeyMap[e] : e
    dto[key] = obj[e]
  })
  return dto
}

const dtoKeyMap = {
  password: 'passwd',
  hoten: 'name',
  cmnd: 'idNumber',
  diachi: 'address',
  chucvu: 'role',
  shgiaycn: 'id',
  ngayki: 'signDate',
  coquancap: 'provider',
  dtrieng: 'privateArea',
  dtchung: 'publicArea',
  mucdichsudung: 'targetOfUse',
  nguongocsudung: 'sourceOfUse',
  thoihansudung: 'goodUntil'
}

app.get('/account/b4c1db7e5a0dc91b7b739db0c3ece205dd8c9a66', (req, res) => {
  const loggedRole = getLoggedRole(req)
  res.json({code: 200, role: loggedRole})
})

const getLoggedRole = req => {
  const deoken = getDeoken(req)
  return deoken.role || 0
}

const getDeoken = req => {
  if (req.headers['x-access-token']) {
    const deoken = jwt.decode(req.headers['x-access-token'], secret)
    console.log('cout << got token: ', deoken)
    if ( ! isExpired(deoken)) {
      return deoken
    } else {
      console.log('cout << token expired!')
    }
  } else {
    console.log('cout << no token!')
  }
  return {}
}

const getLoggedId = req => {
  const deoken = getDeoken(req)
  return deoken.uid || -1
}

const isExpired = deoken => {
  if (!deoken.ca)
    return true
  const now = (new Date()).getTime()
  if (now - Number(deoken.ca) < 3600000)
    return false
  return true
}

app.post('/account/login', (req, res) => {
  const bodyStr = InputHandler.format(JSON.stringify(req.body), AS_STRING)
  const body = JSON.parse(bodyStr)
  const q = 'SELECT id, chucvu as role FROM taikhoan'
            + ' WHERE username=\''+body.ua+'\''
            + ' AND password=md5(\''+body.passwd+'\')'
  performQuery(q, (rows, rowCount) => {
    if (rowCount == 1) {
      const token = jwt.encode({
        uid: rows[0].id,
        role: rows[0].role,
        ca: (new Date()).getTime()
      }, secret)
      res.json({code: 200, role: rows[0].role, token})
    } else {
      res.json({code: 403})
    }
  }, () => { res.json({code: 500}) })
})

app.post('/account/reset-passwd', (req, res) => {
  const uid = getLoggedId(req)
  if (uid < 0) {
    res.json({code: 403})
    return
  }
  const bodyStr = InputHandler.format(JSON.stringify(req.body), AS_STRING)
  const body = JSON.parse(bodyStr)
  const checkPasswdScript = 'SELECT id'
                          + ' FROM taikhoan'
                          + ' WHERE id = ' + uid
                          + ' AND password = md5(\'' + body.oldPass + '\')'
  const updateScript = 'UPDATE taikhoan'
                        + ' SET password = md5(\'' + body.newPass + '\')'
                        + ' WHERE id = ' + uid
  performQuery(checkPasswdScript, rows => {
    if (rows.length === 1) {
      performQuery(updateScript, (_, rowCount) => {
        if (rowCount === 1)
          res.json({done: true})
        else
          res.json({done: false, code: 500})
      })
    } else {
      res.json({done: false, code: 401})
    }
  })
})

app.get('/plan-user', (req, res) => {
  if ( ! isLoggedAsAdmin(req)) {
    res.json({code: 403})
    return
  }
  const kind = InputHandler.format(req.query.kind, AS_STRING)
  const value = InputHandler.format(req.query.value, AS_STRING)
  const fieldName = getPlanUserFieldNameByKind(kind)
  const condition = getConditionPhase(fieldName, value)
  const queryStr = 'SELECT * FROM chusudung WHERE ' + condition
  performQuery(queryStr, objs => res.json(objs), true)
})

const isLoggedAsAdmin = req => {
  const deoken = getDeoken(req)
  return deoken.role === 1
}

getPlanUserFieldNameByKind = kind => {
  switch(kind) {
    case 'name':
      return 'ten'
    case 'id':
    default:
      return 'sogiayto'
  }
}

getConditionPhase = (fieldName, value) => {
  switch(fieldName) {
    case 'ten':
      return "UPPER(ten) like '%"+value.toUpperCase()+"%'"
    case 'sogiayto':
      return "sogiayto = '"+value+"'"
    default:
      return '0=1'
  }
}

InputHandler = {
  format: (input, outputFormat) => {
    switch(outputFormat) {
      case AS_NUMBER:
        return Number(input)
      case AS_STRING:
        return (''+input).replace("'", "''")
      default:
        return undefined
    }
  }
}

app.post('/account', (req, res) => {
  if ( ! isLoggedAsAdmin(req)) {
    res.json({code: 403})
    return
  }
  const flat = InputHandler.format(JSON.stringify(req.body), AS_STRING)
  const payload = JSON.parse(flat)
  if (payload.role !== 1 && payload.role !== 2) {
    res.json({code: 400, cause: 'role'})
    return
  }
  if (!payload.name) {
    res.json({code: 400, cause: 'name'})
    return
  }
  const q = 'SELECT id FROM taikhoan WHERE username = \'' + payload.username + '\''
  performQuery(q, rows => {
    if (rows.length === 0)
      performAccountInsert(payload, res)
    else
      res.json({code: 400, cause: 'username'})

  })
})

const performAccountInsert = (payload, res) => {
  const pairArray = convertPayload(
    payload, accountKeyMap, accountKeyNumber, accountKeyEncrypt)
  const insertQuery = buildInsertQuery(pairArray, 'taikhoan')
  performQuery(insertQuery, (_, rowCount) => {
    rowCount === 1
      ? res.json({code: 200})
      : res.json({code: 500})
  })
}

const accountKeyMap = {
  username: 'username',
  passwd: 'password',
  name: 'hoten',
  idNumber: 'cmnd',
  address: 'diachi',
  role: 'chucvu'
}

const accountKeyNumber = {
  role: true
}

const accountKeyEncrypt = {
  passwd: true
}

convertPayload = (payload, keyMap, numberType, encryptField) => {
  let pairArray = []
  const keys = Object.keys(payload)
  const len = keys.length
  for (let i = 0; i < len; i++) {
    if (!keyMap[keys[i]])
      continue
    pairArray.push(keyMap[keys[i]])
    if (numberType[keys[i]])
      pairArray.push(payload[keys[i]])
    else if (encryptField[keys[i]])
      pairArray.push('md5('+'\''+payload[keys[i]]+'\''+')')
    else
      pairArray.push('\''+payload[keys[i]]+'\'')
  }
  return pairArray
}

buildInsertQuery = (pairArray, tableName) => {
  const len = pairArray.length
  if (len < 2)
    return ''
  let firstPhase = 'INSERT INTO '+tableName+'(' + pairArray[0]
  let secondPhase = 'VALUES(' + pairArray[1]
  for (let i = 2; i < len - 1; i+=2){
    firstPhase += (',' + pairArray[i])
    secondPhase += (',' + pairArray[i+1])
  }
  return firstPhase + ') ' + secondPhase + ')'
}

app.put('/account', (req, res) => {
  if ( ! isLoggedAsAdmin(req)) {
    res.json({code: 403})
    return
  }
  const bodyStr = InputHandler.format(JSON.stringify(req.body), AS_STRING)
  const body = JSON.parse(bodyStr)
  const id = InputHandler.format(body.id, AS_NUMBER)
  if (!id) {
    res.json({code: 400})
    return
  }
  delete body.username
  delete body.id
  delete body.passwd
  const pairArray = convertPayload(body, accountKeyMap, accountKeyNumber, [])
  const q = buildUpdateQuery(pairArray, 'taikhoan', 'id='+id)
  performQuery(q, (_, rowCount) => {
    rowCount === 1
      ? res.json({code: 200})
      : res.json({code: 500})
  }, () => res.json({code: 500}))
})

buildUpdateQuery = (pairArray, tableName, identifyPhase) => {
  const len = pairArray.length
  if (len < 2)
    return ''
  let query = 'UPDATE ' + tableName + ' SET ' + pairArray[0] + '=' + pairArray[1]
  for (let i = 2; i < len-1; i+=2)
    query += (', ' + pairArray[i] + '=' + pairArray[i+1])
  return query + ' where ' + identifyPhase
}


// # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # # 

app.get('/map/layers', (req, res) => {
  var layers = [
    { value: 'thuadat', label: 'Thửa đất' },
    { value: 'quihoach', label: 'Quy hoạch' }
  ]
  res.json(layers)
})

var server = app.listen(8080, () => {
  console.log("Server started")
})
