const getInitialState = async (db) => ({
  home: {
    value: 0
  },

  navbar: {
    active: false
  },

  devices: await fetchDevicesFromDb(db)
})

function fetchDevicesFromDb (db) {
  let devices

  return new Promise(async function (resolve, reject) {
    try {
      devices = await db.any('SELECT * FROM devices')
    } catch (err) {
      reject(err)
    }

    resolve(devices)
  })
}

export default getInitialState
