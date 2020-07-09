const SERVER_PATH = 'http://localhost:3000'

function checkLogin() {
    if (!localStorage.getItem('token')) {
        showLogin()
    } else {
        showContent()
    }
}

function showLogin() {
    $('#register-page').hide()
    $('#logout-nav').hide()
    $('#login-nav').hide()

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
            showContent()
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
      showLogin()
    });
}

function showRegister() {
    $('#login-page').hide()
    $('#register-nav').hide()
    $('#logout-nav').hide()
    
    $('#login-nav').show()
    $('#register-page').show()
}

function showContent() {
    $('#login-page').hide()
    $('#register-nav').hide()
    $('#login-nav').hide()
    $('#register-page').hide()

    $('#logout-nav').show()
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
            $('#show-alert').empty()
            $('#show-alert').append(`
            <div class="alert alert-success" role="alert">
                <strong>Success.</strong> Success login with ${email}
            </div>
            `)
            showContent()
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
            showContent()
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
})