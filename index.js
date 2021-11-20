// Import stylesheets
import './style.css';

var tour = new Tour({
  steps: [
    {
      element: '#text1',
      title: 'Form',
      content: 'Enter text for Input 1.',
      onNext: function (tour) {
        validateStepInput(tour);
      },
    },
    {
      element: '#text2',
      title: 'Form',
      content: 'Enter text for Input 2.',
      onNext: function (tour) {
        validateStepInput(tour);
      },
      onShown: function (tour) {
        checkPreviousStepValid(tour);
      },
    },
    {
      element: '#submit',
      title: 'Form',
      content: 'Submit the form.',
      onShown: function (tour) {
        checkPreviousStepValid(tour);
      },
    },
  ],
});

tour.init();
tour.start();

var invalidStep = -1;
function validateStepInput(tour, inputSelector) {
  var step = tour._options.steps[tour.getCurrentStep()];

  var $attachedEl =
    typeof inputSelector == 'undefined' ? $(step.element) : $(inputSelector);

  if ($attachedEl.length > 0 && $attachedEl.is('input')) {
    if ($attachedEl.attr('type') == 'text') {
      var val = $attachedEl.val();
      if (val.length == 0) {
        invalidStep = tour.getCurrentStep();
      }
    } else if ($attachedEl.attr('type') == 'radio') {
      var anyChecked = $attachedEl.is(':checked');
      if (!anyChecked) {
        invalidStep = tour.getCurrentStep();
      }
    } else if ($attachedEl.attr('type') == 'checkbox') {
      var anyChecked = $attachedEl.is(':checked');
      if (!anyChecked) {
        invalidStep = tour.getCurrentStep();
      }
    }
  }

  return invalidStep == -1;
}

function checkPreviousStepValid(tour) {
  // .goTo only seems to work in the onShown step event so I had to put this check
  // on the next step's onShown event in order to redisplay the previous step with
  // the error
  if (invalidStep > -1) {
    var tempStep = invalidStep;
    invalidStep = -1;
    tour.goTo(tempStep);
  }
}
