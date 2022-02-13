import swal from 'sweetalert';
function upsert(array, element) { 
    var flag=true;

    const i = array.findIndex((ele) => (ele.stationId === element.stationId));
    if(array[i].slot==24){
        flag=false;
    }
    if (i > -1) array[i] = element;
    else array.push(element);
    console.log({array})
     // const station = array.findIndex((el) => el.stationId === stationId);
    // console.log({stations});
    // if(station)console.log("station from redux"+ station + " ");
    if(flag)swal("Book a slot",`Slot ${element.slot} booked for Electric Vehicle Charging Station ${element.stationId}`,"success");
    else swal("Not available",`No Slot left for today at Electric Vehicle Charging Station ${element.stationId}`,"error");
    //setId(null);
    // window.location.reload();
    return array;
    
  }
export default (stations=[],action) => {
    switch(action.type){
        case 'FETCH_ALL':
            return action.payload;
        case 'UPDATE':
                return upsert(stations,action.payload);
        default:
            return stations;
    }
}