var emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
var api = new Waitlisted.Api({domain: "source-networks.app.waitlisted.co"})

var unknownError = 'Uh oh. Looks like there was an error; try again later.';
var alreadyTakenError = 'That email is already on the waitlist!';

$('form.sign-up-form').on('submit', function (e) {
  e.preventDefault();
  var $this = $(this);
  var email = $this.find('input.email-input').val();
  if (email === '') {
    return;
  }
  $this.find('h2').addClass('hidden');
  $this.find('.msg-container').removeClass('hidden');
  if (email && email.match(emailRegex)) {
    api.reserve({ email: email })
      .then(function (response) {
        var position = response.reservation.position;
        $this.find('h2.success').removeClass('hidden');
        $this.find('.waitlist-number').text('' + position);
      }, function (err) {
        $this.find('h2.error').removeClass('hidden');
        if (err.errors.email[0] === 'has already been taken') {
          $this.find('h2.error').text(alreadyTakenError);
        } else {
          $this.find('h2.error').text(unknownError);
        }
      });
  } else {
    $this.find('h2.invalid').removeClass('hidden');
  }
});
