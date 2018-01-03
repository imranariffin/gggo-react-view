(function() {
	console.log("making ajax call to api/online-users ... ");
	$.get("http://localhost:8081/GGGo/api/online-users", function(onlineUsers) {
		console.log(onlineUsers);
		for (var i = 0; i < onlineUsers.length; i++) {
			var user = onlineUsers[i];
			console.log(user);
			$("#online-users-table").append(
					$("<tr>")
						.append($("<td>").append(user.username))
						.append($("<td>").append("9x9"))
						.append($("<td>").append("9 dan"))
						.append($("<td>").append($("<a href='send-invite?invitee=" + user.username + "'>invite</a>")))
			);
		}
	});
})();