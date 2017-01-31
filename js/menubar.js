$('#menu-toggle').on('click', function () {
  $('.topbar.small-screens').toggleClass('active');
})

var navbarInverse = false;
const NAVBAR_HEIGHT = 60;
function onScrollOrResize() {
  // don't forget - getBoundingClientRect() is viewport-relative!
  var newNavbarInverse = NAVBAR_HEIGHT >= $('.hero').get(0).getBoundingClientRect().bottom;
  if (navbarInverse !== newNavbarInverse) {
    navbarInverse = newNavbarInverse;
    if (newNavbarInverse) {
      $('.topbar.small-screens').addClass('inverse');
    } else {
      $('.topbar.small-screens').removeClass('inverse');
    }
  }
}

window.addEventListener('scroll', onScrollOrResize);
window.addEventListener('resize', onScrollOrResize);
onScrollOrResize();
