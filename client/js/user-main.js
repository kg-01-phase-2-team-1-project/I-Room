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
    
    $('#homepage-nav').show()
    $('#login-nav').show()
    $('#register-page').show()
}

function customerPage() {
    $('#login-page').hide()
    $('#register-nav').hide()
    $('#login-nav').hide()
    $('#register-page').hide()
    $('#add-room').hide()
    $('#homepage-nav').hide()

    $('#logout-nav').show()

    fetchData()
}

function adminPage() {
    $('#login-page').hide()
    $('#register-nav').hide()
    $('#login-nav').hide()
    $('#register-page').hide()
    $('#homepage-nav').hide()

    $('#logout-nav').show()
    $('#add-room').show()

    fetchData()
}

function homePage() {
    $('#logout-nav').hide()
    $('#add-room').hide()
    $('#register-page').hide()
    $('#login-page').hide()
    $('#homepage-nav').show()
    
    $('#login-nav').show()
    $('#register-nav').show()

    $('#show-alert').empty()
    $('#show-alert').append(`
    <div class="alert alert-primary" role="alert">
        <strong>silahkan login untuk booking</strong>
    </div>
    `)
    
    fetchData()
}

function fetchData() {
    $('#room-list').empty()
    $.ajax({
        method: 'GET',
        url: `${SERVER_PATH}/room`
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
                    if (room.status == 'Unoccupied') {
                        $('#room-list').append(`
                        <div class="col-sm-4 my-3">
                            <div class="card">
                                <div class="card-header font-weight-bold">
                                    ${room.type}
                                </div>
                                <div class="card-body">
                                <h1 class="card-title font-weight-bold">${room.name}</h1>
                                <p class="card-text font-weight-bold">Status room : ${room.status}</p>
                                <a href="#" class="btn btn-primary font-weight-bold">edit room</a>
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
                                <a href="#" class="btn btn-primary font-weight-bold">edit room</a> <a href="#" class="btn btn-primary font-weight-bold">checkout</a>
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
                                <a href="#" class="btn btn-primary font-weight-bold">book</a>
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

$(document).ready(() => {
    checkLogin()
    
    $('#login-form').submit(function (event) {
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
            if (response.role === 'admin') {
                adminPage()
            } else {
                customerPage()
            } 
            $('#show-alert').empty()
            $('#show-alert').append(`
            <div class="alert alert-success" role="alert">
                <strong>Success.</strong> Success login with ${email}
            </div>
            `)
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
            customerPage()
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
        googleSignOut()
        $('#show-alert').empty()
        $('#show-alert').append(`
        <div class="alert alert-success" role="alert">
            <strong>Success.</strong> Success logout
        </div>
        `)
        showLogin()
        event.preventDefault()
    })

    $('#register-nav').click(function (event) {
        showRegister()
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
})