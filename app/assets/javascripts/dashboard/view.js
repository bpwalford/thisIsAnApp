$(function () {
  $('.compare-link').click(function () {
    $('.diagram').fadeOut(500);
    $('.compare-prints').delay(500).fadeIn(500);
  })
  $('.diagram-link').click(function () {
    $('.compare-prints').fadeOut(500);
    $('.diagram').delay(500).fadeIn(500);
  })
});
