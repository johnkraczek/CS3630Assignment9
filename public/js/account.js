(function (exports) {
	exports.account = new Vue({
		el: '#account',
		data:{
			logged: false
		},
		methods:{
			chkLogged: function(){
				$.ajax({
					url: '/user/logged',
					method: 'GET',
					dataType: 'json',
					success: function (data) {
						account.logged = data.loggedIn;
					}
				});
			}
		}
	});
})(window);