function validateSignupForm() {
    const array = $("#form-signup").serializeArray();
    const json = {};
    $.each(array, function () {
        json[this.name] = this.value || "";
    });

    fetch('/signup', {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                $('#message-signup-error').hide();
                location.reload()
            } else {
                $('#message-signup-success').hide();
                return response.json().then(data => {
                    throw new Error(data.msg);
                });
            }
        })
        .catch(error => {
            $('#message-signup-error').text(error.message);
            $('#message-signup-error').show();
        });

    return false
}

function validateLoginForm() {
    const array = $("#form-login").serializeArray();
    const json = {};
    $.each(array, function () {
        json[this.name] = this.value || "";
    });

    fetch('/login', {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                $('#modal-login').modal('hide');
                $('#message-login-error').hide();
                location.reload();
            } else {
                return response.json().then(data => {
                    throw new Error(data.msg);
                });
            }
        })
        .catch(error => {
            $('#message-login-error').text(error.message);
            $('#message-login-error').show();
        });

    return false
}

$('#link-login-modal').on('click', () => {
    $('#modal-signup').modal('hide');
    $('#modal-login').modal('show');
    return false;
})

$('#link-signup-modal').on('click', () => {
    $('#modal-login').modal('hide');
    $('#modal-signup').modal('show');
    return false;
})

$('#order-signup').on('click', () => {
    $('#modal-login').modal('hide');
    $('#modal-signup').modal('show');
    return false;
})

$('#pet-name').on('change', function () {
    toggleRows()
})

$('#pet-types').on('change', function () {
    toggleRows()
})

$('#services').on('change', function () {
    toggleRows()
})

function toggleRows() {
    let total_price = Number($('input[name="pet-types"]:checked').data('pet-type-price')) + Number($('input[name="services"]:checked').data('service-price')) 
    $('#total-price').text(`Total: ₴ ${(total_price / 100).toFixed(2)}`)
    if ($("#pet-types input[type='radio']:checked").val() && $('#pet-name').val()) {
        $('#service-row').collapse('show')
        if ($("#services input[type='radio']:checked").val()) {
            $('#optional-row').collapse('show')
            $('#price-row').collapse('show')
            $('#btn-pay').show()
        } else {
            $('#btn-pay').hide()
        }
    } else {
        $('#btn-pay').hide()
    }
}

$('#phone')
.keydown(function (e) {
    var key = e.which || e.charCode || e.keyCode || 0;
    $phone = $(this);

    if ($phone.val().length === 1 && (key === 8 || key === 46)) {
        $phone.val('(');
        return false;
    }
    else if ($phone.val().charAt(0) !== '(') {
        $phone.val('(' + String.fromCharCode(e.keyCode) + '');
    }

    if (key !== 8 && key !== 9) {
        if ($phone.val().length === 4) {
            $phone.val($phone.val() + ')');
        }
        if ($phone.val().length === 5) {
            $phone.val($phone.val() + ' ');
        }
        if ($phone.val().length === 9) {
            $phone.val($phone.val() + '-');
        }
        if ($phone.val().length === 12) {
            $phone.val($phone.val() + '-');
        }
    }

    return (key == 8 ||
        key == 9 ||
        key == 46 ||
        (key >= 48 && key <= 57) ||
        (key >= 96 && key <= 105));
})
.bind('focus click', function () {
    $phone = $(this);

    if ($phone.val().length === 0) {
        $phone.val('(');
    }
    else {
        var val = $phone.val();
        $phone.val('').val(val);
    }
})
.blur(function () {
    $phone = $(this);

    if ($phone.val() === '(') {
        $phone.val('');
    }
});

$('#btn-pay').on('click', () => {
    $('#spinner-pay').show()

    json = {
        'pet_name': $('#pet-name').val(),
        'pet_type_id': $('input[name="pet-types"]:checked').data('pet-type-id'),
        'service_id': $('input[name="services"]:checked').data('service-id'),
        'phone': $('#phone').val(),
        'comments': $('#comments').val(),
    }

    fetch('/order', {
        method: 'POST',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                return response.json()
            } else {
            }
        })
        .then(data => {
            window.location.href = data.url;
        })
        .finally(() => {
            $('#spinner-pay').hide();
        })
})

$('#btn-update-profile').on('click', () => {
    const array = $("#form-profile").serializeArray();
    const json = { 'fields': {} };
    $.each(array, function () {
        json['fields'][this.name] = this.value || "";
    });

    fetch('/profile', {
        method: 'PATCH',
        body: JSON.stringify(json),
        headers: {
            'Content-Type': 'application/json'
        }
    })
        .then(response => {
            if (response.ok) {
                location.reload();
            } else {
                throw new Error('Profile update failed');
            }
        })
        .catch(error => {
            console.log(error);
        });

    return false
})
