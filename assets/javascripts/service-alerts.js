// Display Alerts
var displayAlerts = function (data) {
  var alertContainer = $('#service_alerts')
  alertContainer.empty()
  if (!data || data.length === 0) {
    var content = L.Util.template($('#alert_empty_template').html(), {})
    $(alertContainer).append(content)
    $('#service_alerts_modal').modal('show')
  }

  // Add the group container
  var alertGroup = L.Util.template(
    $('#alert_group_template').html(),
    {}
  )
  $(alertContainer).append(alertGroup);

  var alertTypeCounts = {}

  $.each(data, function (i, message) {
    if (!message.alert.effect) {
      message.alert.effect = 'Notice'
    }

    var alertType = message.alert.effect.toLowerCase().replace(' ', '_')

    var alert_class = 'info'
    if (message.alert.effect == 'Detour' || message.alert.effect == 'Significant Delays') {
      alert_class = 'warning'
    }
    if (message.alert.effect == 'Reduced Service' || message.alert.effect == 'No Service') {
      alert_class = 'danger'
    }

    // Create the container for the alerts if not present
    if (!$('#alert-group-' + alertType).length) {
      alertTypeCounts[alertType] = 0
      $('#alertGroup').append(L.Util.template(
        $('#alert_group_item_template').html(),
        {
          type: alertType,
          displayType: message.alert.effect
        }
      ))
    }

    var content = L.Util.template(
      $('#alert_template').html(),
      {
        alert_class: alert_class,
        alert_effect: message.alert.effect,
        alert_cause: message.alert.cause ? ' (' + message.alert.cause +')' : '',
        alert_heading: message.alert.header_text.translation[0].text,
        alert_body: message.alert.description_text.translation[0].text.replace(/(\n)/g, '<br />'),
        start_date: moment.unix(message.alert.active_period[0].start).format('l h:mm a'),
        end_date: moment.unix(message.alert.active_period[0].end).format('l h:mm a')
      }
    )
    $('#alert-group-' + alertType).append(content)
    // Increment counter
    alertTypeCounts[alertType]++
    $('#alert-group-count-' + alertType).html(
      alertTypeCounts[alertType]
    )
  })
  $('#service_alerts_modal').modal('show')
}
