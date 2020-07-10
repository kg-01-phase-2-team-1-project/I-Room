const SERVER_PATH = 'http://localhost:3000'

function checkLogin() {
    if (!localStorage.getItem('token')) {
        homePage()
    } else {
        if (localStorage.getItem('role') === 'admin') {
            adminPage()
        } else {
            customerPage()
        }
    }
}

function showLogin() {
    $('#register-page').hide()
    $('#logout-nav').hide()
    $('#login-nav').hide()
    $('#content-list').hide()
    $('#weatherShow').hide()
    $('#add-room-nav').hide()
    $('#addroom-page').hide()
    
    $('#homepage-nav').show()
    $('#login-page').show()
    $('#register-nav').show()
}

function onSignIn(googleUser) {
    const google_token = googleUser.getAuthResponse().id_token;
    $.ajax({
        url: `${SERVER_PATH}/user/login/google`,
        method: 'POST',
        headers: {
            google_token
        }
    })
        .done(response => {
            localStorage.setItem('token', response.token)
            $('#show-alert').empty()
            $('#show-alert').append(`
            <div class="alert alert-success" role="alert">
                <strong>Success.</strong> Success login with your gmail
            </div>
            `)
            customerPage()
        })
        .fail((xhr, status, error) => {
            console.log('fail')
            console.log(xhr, status, error)
            $('#show-alert').empty()
            $('#show-alert').append(`
            <div class="alert alert-danger" role="alert">
                <strong>Error.</strong> ${xhr}
            </div>
            `)
        })
        .always(response => {
            console.log('always', response)
        })
}

function googleSignOut() {
    const auth2 = gapi.auth2.getAuthInstance();
    auth2.signOut().then(function () {
      homePage()
    });
}

function showRegister() {
    $('#login-page').hide()
    $('#register-nav').hide()
    $('#logout-nav').hide()
    $('#content-list').hide()
    $('#weatherShow').hide()
    $('#add-room-nav').hide()
    $('#addroom-page').hide()
    
    $('#homepage-nav').show()
    $('#login-nav').show()
    $('#register-page').show()
}

function customerPage() {
    $('#login-page').hide()
    $('#register-nav').hide()
    $('#login-nav').hide()
    $('#register-page').hide()
    $('#add-room-nav').hide()
    $('#homepage-nav').hide()
    $('#addroom-page').hide()

    $('#logout-nav').show()
    $('#content-list').show()
    $('#weatherShow').show()

    fetchData()
    fetchWeather()
}

function adminPage() {
    $('#login-page').hide()
    $('#register-nav').hide()
    $('#login-nav').hide()
    $('#register-page').hide()
    $('#homepage-nav').hide()
    $('#addroom-page').hide()

    $('#add-room-nav').show()
    $('#logout-nav').show()
    $('#content-list').show()
    $('#weatherShow').show()

    fetchData()
    fetchWeather()
}

function homePage() {
    $('#logout-nav').hide()
    $('#add-room-nav').hide()
    $('#register-page').hide()
    $('#login-page').hide()
    $('#addroom-page').hide()

    $('#homepage-nav').show()
    $('#login-nav').show()
    $('#register-nav').show()
    $('#content-list').show()
    $('#weatherShow').show()

    $('#show-alert').empty()
    $('#show-alert').append(`
    <div class="alert alert-primary" role="alert">
        <strong>silahkan login untuk booking</strong>
    </div>
    `)
    
    fetchData()
    fetchWeather()
}

function fetchData() {
    $('#room-list').empty()
    $.ajax({
        method: 'GET',
        url: `${SERVER_PATH}/room`,
        headers: {

        }
    })
    .done((response) => {
        console.log('done')
        console.log(response)
        if(!response.length) {
            $('#show-alert').append(`
            <div class="alert alert-primary" role="alert">
                Task masih kosong, klik add task untuk membuat task baru
            </div>
            `)
        } else {
            if (localStorage.getItem('role') === 'admin') {
                
                
                response.forEach(room => {
                    
                    if (room.status === 'Unoccupied') {
                        $('#room-list').append(`
                        <div class="col-sm-4 my-3">
                            <div class="card">
                                <div class="card-header font-weight-bold">
                                    ${room.type}
                                </div>
                                <div class="card-body">
                                <h1 class="card-title font-weight-bold">${room.name}</h1>
                                <p class="card-text font-weight-bold">Status room : ${room.status}</p>
                                <a href="#" id="edit-button-admin" class="btn btn-primary font-weight-bold" data-room-id="${room.id}>edit room</a>
                                </div>
                            </div>
                        </div>
                        `)
                    } else {
                        $('#room-list').append(`
                        <div class="col-sm-4 my-3">
                            <div class="card">
                                <div class="card-header font-weight-bold">
                                    ${room.type}
                                </div>
                                <div class="card-body">
                                <h1 class="card-title font-weight-bold">${room.name}</h1>
                                <p class="card-text font-weight-bold">Status room : ${room.status}</p>
                                <a href="#" id="edit-button-admin" class="btn btn-primary font-weight-bold" data-room-id="${room.id}>edit room</a> <a href="#" id="checkout-button-admin" class="btn btn-primary font-weight-bold" data-room-id="${room.id}>checkout</a>
                                </div>
                            </div>
                        </div>
                        `)
                    }
                })
            } else {
                response.forEach(room => {
                    if (room.status == 'Unoccupied') {
                        $('#room-list').append(`
                        <div class="col-sm-4 my-3">
                            <div class="card">
                                <div class="card-header font-weight-bold">
                                    ${room.type}
                                </div>
                                <div class="card-body">
                                <h1 class="card-title font-weight-bold">${room.name}</h1>
                                <a href="#" id="book-button" class="btn btn-primary font-weight-bold">book</a>
                                </div>
                            </div>
                        </div>
                        `)
                    }
                })
            }
        }
    })
    .fail((xhr, status, error) => {
        console.log('fail')
        console.log(xhr.responseJSON, status, error)
        $('#show-alert').append(`
        <div class="alert alert-danger" role="alert">
            <strong>Error.</strong> ${xhr.responseJSON.errors}
        </div>
        `)
    })
    .always((response) => {
        console.log('always')
        console.log(response)
    })
}

function fetchWeather() {
    $('#weatherShow').empty()
    $.ajax({
        method: 'GET',
        url: `${SERVER_PATH}/api/weather`
    })
    .done((response) => {
        console.log('weather done')
        console.log(response)
        $('#weatherShow').append(`
        <div class="col-sm-12 col-md-12" style="padding-left: 0; padding-right: 0; z-index:1;">
            <div class="card">
                <div class="card-header font-weight-bold">
                    ${response.location.name}, ${response.location.region}, ${response.location.country}
                </div>
                <div class="card-body">
                <h1 class="card-title font-weight-bold">${response.current.temperature}° C</h1>
                <p class="card-text font-weight-bold">${response.current.weather_descriptions} </p>
                <img src="${response.current.weather_icons}" alt="weather">
                </div>
            </div>
        </div>
        `)
    })
    .fail((xhr, status, error) => {
        console.log('fail')
        console.log(xhr.responseJSON, status, error)
    })
    .always((response) => {
        console.log('weather always')
        console.log(response)
    })
}

function showAddRoom() {
    $('#login-page').hide()
    $('#register-nav').hide()
    $('#login-nav').hide()
    $('#register-page').hide()
    $('#homepage-nav').hide()
    $('#content-list').hide()
    $('#weatherShow').hide()
    
    $('#addroom-page').show()
    $('#add-room-nav').show()
    $('#logout-nav').show()
    $('#add-room').show()
}

$(document).ready(() => {
    checkLogin()
    
    $('#login-form').submit(function (event) {
        event.preventDefault();
        const email = $('#login-email').val()
        const password = $('#login-password').val()
        $.ajax({
            method: 'POST',
            url: `${SERVER_PATH}/user/login`,
            data: {
                email: email,
                password: password
            }
        })
        .done(response => {
            console.log('done')
            console.log(response)
            localStorage.setItem('token', response.token)
            localStorage.setItem('role', response.role)
            $('#login-email').val('')
            $('#login-password').val('') 
            $('#show-alert').empty()
            $('#show-alert').append(`
            <div class="alert alert-success" role="alert">
                <strong>Success.</strong> Success login with ${email}
            </div>
            `)
            if (response.role === 'admin') {
                adminPage()
            } else {
                customerPage()
            }
        })
        .fail((xhr, status, error) => {
            console.log('fail')
            console.log(xhr.responseJSON, status, error)
            $('#show-alert').empty()
            $('#show-alert').append(`
            <div class="alert alert-danger" role="alert">
                <strong>Error.</strong> ${xhr.responseJSON.errors}
            </div>
            `)
        })
        .always(response => {
            console.log('done')
            console.log(response)
        })
        event.preventDefault()
    })

    $('#register-form').submit(function (event) {
        const user = {
            email: $('#register-email').val(),
            password: $('#register-password').val(),
            firstname: $('#register-firstname').val(),
            lastname: $('#register-lastname').val(),
            birthOfDate: $('#register-birthOfDate').val(),
        }
        $.ajax({
            method: 'POST',
            url: `${SERVER_PATH}/user/register`,
            data: user
        })
        .done(response => {
            console.log('done')
            console.log(response)
            localStorage.setItem('token', response.token)
            $('#show-alert').empty()
            $('#show-alert').append(`
            <div class="alert alert-success" role="alert">
                <strong>Success.</strong> Success Register with this ${user.email}
            </div>
            `)
            homePage()
        })
        .fail((xhr, status, error) => {
            console.log('fail')
            console.log(xhr.responseJSON, status, error)
            $('#show-alert').empty()
            $('#show-alert').append(`
            <div class="alert alert-danger" role="alert">
                <strong>Error.</strong> ${xhr.responseJSON.errors}
            </div>
            `)
        })
        .always(response => {
            console.log(response)
        })
        event.preventDefault()
    })

    $('#logout-nav').click(function (event) {
        localStorage.removeItem('token')
        localStorage.removeItem('role')
        googleSignOut()
        $('#show-alert').empty()
        $('#show-alert').append(`
        <div class="alert alert-success" role="alert">
            <strong>Success.</strong> Success logout
        </div>
        `)
        event.preventDefault()
        showLogin()
    })

    $('#register-nav').click(function (event) {
        showRegister()
        event.preventDefault()
    })

    $('#addroom-form').submit(function(event) {
        const name = $('#addroom-name').val()
        const type = $('#addroom-type').val()
        $.ajax({
            method: 'POST',
            url: `${SERVER_PATH}/room/add`,
            headers: {
                token: localStorage.getItem('token')
            },
            data: {
                name,
                type
            }
        })
        .done((response) => {
            console.log('done')
            console.log(response)
            $('#show-alert').empty()
            $('#show-alert').append(`
            <div class="alert alert-success" role="alert">
                <strong>Success.</strong> Success add room ${name}
            </div>
            `)
            adminPage()
        })
        .fail((xhr, status, error) => {
            console.log('fail')
            console.log(xhr.responseJSON, status, error)
            $('#show-alert').empty()
            $('#show-alert').append(`
            <div class="alert alert-danger" role="alert">
                <strong>Error.</strong> ${xhr.responseJSON.errors}
            </div>
            `)
        })
        .always((response) => {
            console.log('always')
            console.log(response)
        })
        event.preventDefault()
    })

    $('#login-nav').click(function (event) {
        showLogin()
        event.preventDefault()
    })
    $('#homepage-nav').click(function (event) {
        homePage()
        event.preventDefault()
    })
    $('#add-room-nav').click(function (event) {
        showAddRoom()
        event.preventDefault()
    })
})