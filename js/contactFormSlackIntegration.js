function bold(text) {
  return '*' + text + '*';
}

function showSuccessMessage() {
  $('#feedback-area').html('<p class="success">We‘ve received your comment! We‘ll be in touch as soon as we can.</p>');
}

function showErrorMessage() {
  $('#feedback-area').html('<p class="error">Message send failure.</p>');
}

$('.contact-form').submit(function (e) {
  e.preventDefault();
  var name = $(this).find('.name-input').val().trim();
  var email = $(this).find('.email-input').val().trim();
  var comments = $(this).find('.comment-input').val().trim();

  var text = bold(name) + ' at ' + bold('<mailto:' + email + '|' + email + '>') + ' sent a message:\n';
  var attachments = [
    {
      text: comments,
    }
  ];
  var data = { text: text, attachments: attachments };
  $.ajax({
    type: "POST",
    url: 'https://hooks.slack.com/services/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',
    processData: false,
    data: JSON.stringify(data),
    success: showSuccessMessage,
    error: function(e, status, error) {
      showErrorMessage();
      console.error(e, status, error);
    }
  });

});
