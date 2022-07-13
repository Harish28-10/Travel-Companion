import { makeStyles } from '@material-ui/core/styles';

export default makeStyles(() => ({
  paper: {
    padding: '10px', display: 'flex', flexDirection: 'column', justifyContent: 'center', width: '100px',
  },
  mapContainer: {
    height: '85vh', width: '100%',
  },
  markerContainer: {
    position: 'absolute', transform: 'translate(-50%, -50%)', zIndex: 100, '&:hover': { zIndex: 200 },
  },
  pointer: {
    cursor: 'pointer', width: '40px' , height: '40px'
  },
}));