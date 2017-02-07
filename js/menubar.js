$('#menu-toggle').on('click', function () {
  $('.topbar.small-screens').toggleClass('active');
})

var navbarInverse = false;
var navbarInverseLg;
const NAVBAR_HEIGHT = 60;
const NAVBAR_HEIGHT_LG = 66;
function onScrollOrResize() {
  // don't forget - getBoundingClientRect() is viewport-relative!
  var newNavbarInverse = NAVBAR_HEIGHT >= $('.hero').get(0).getBoundingClientRect().bottom;
  var newNavbarInverseLg = NAVBAR_HEIGHT_LG >= $('.hero').get(0).getBoundingClientRect().bottom;
  if (navbarInverse !== newNavbarInverse) {
    navbarInverse = newNavbarInverse;
    if (newNavbarInverse) {
      $('.topbar.small-screens').addClass('inverse');
    } else {
      $('.topbar.small-screens').removeClass('inverse');
    }
  }
  if (navbarInverseLg !== newNavbarInverseLg) {
    navbarInverseLg = newNavbarInverseLg;
    if (newNavbarInverseLg) {
      $('.topbar.large-screens').addClass('inverse');
    } else {
      $('.topbar.large-screens').removeClass('inverse');
    }
  }
}

window.addEventListener('scroll', onScrollOrResize);
window.addEventListener('resize', onScrollOrResize);
onScrollOrResize();
