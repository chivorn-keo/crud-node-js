function generateRandomString(length) {
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
  let randomString = '';

  for (let i = 0; i < length; i++) {
      const randomIndex = Math.floor(Math.random() * characters.length);
      randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

function redirectWithMessage(req, res, url, type, message){
  switch (type) {
    case 'success':
      req.flash('success', message);
      break;
    case 'error':
      req.flash('error', message);
      break;
    default:
      break;
  }
  return res.redirect(url);
}

function renderViewWithMessage(req, res, view, data)
{
  var successMsg = req.flash('success');
  var errorMsg = req.flash('error');

  return res.render(view, { ...data, successMsg, errorMsg });
}

module.exports = {
  generateRandomString,
  redirectWithMessage,
  renderViewWithMessage
}