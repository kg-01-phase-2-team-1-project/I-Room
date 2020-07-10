const SERVER_PATH = 'http://localhost:3000'

// Fetch Data - All Rooms
$.ajax({
    method: 'GET',
    url: `${SERVER_PATH}/room`
})
    .done(response => {

    })
    .fail((xhr, status, error) => {
        console.log('fail');
        console.log(xhr, status, error);
    })
    .always(response => {
        console.log('always', response);
    })

// Add Room
const name = ('#room-create-name').val();
const type = ('#room-create-type').val();
$.ajax({
    method: 'POST',
    url: `${SERVER_PATH}/add`,
    data: {
        name,
        type
    }
})
    .done(response => {

    })
    .fail((xhr, status, error) => {
        console.log('fail');
        console.log(xhr, status, error);
    })
    .always(response => {
        console.log('always', response);
    })