function toUTC(date) {
  if (!date || !date.getFullYear) return 0;
  return Date.UTC(date.getFullYear(),
  date.getMonth(), date.getDate());
}

function toDays(interval) {
  interval = interval || 0;
  return Math.floor(interval / 24 / 60 / 60 / 1000);
}

Template.home.helpers({
  campaingTimeRemaining: function () {
    var deadline = 1422741599000;
    var now = new Date(Date.now());
    var remaining = deadline - toUTC(now);
    return toDays(remaining);
  }
});
