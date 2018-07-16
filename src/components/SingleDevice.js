const SingleDevice = ({ device }) =>
  <div>
    <h3>{device.model}</h3>
    <ul>
      <li>Serial: {device.serial}</li>
      <li>Manufacturer: {device.manufacturer}</li>
    </ul>
  </div>

export default SingleDevice
