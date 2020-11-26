(function (window, undefined) {
  'use strict';

  // muestra del file-upload
  $('.tipoLectura').on('change', function () {
    if (this.value === '1') {
      $('.file-upload').addClass('d-block');
    } else {
      $('.file-upload').removeClass('d-block');
    }
    if (this.value === '2') {
      $('.registroConsumo').prop('disabled', true);
      $('.registroConsumo').val('30');
    } else {
      $('.registroConsumo').prop('disabled', false);
      $('.registroConsumo').val('');
    }
  });

})(window);