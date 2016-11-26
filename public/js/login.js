(function (exports) {
	exports.login = new Vue({
		el: '#login',
		data: {
			email: '',
			password: ''
		},
		methods: {
			chkLogin:function(event){
				const form = $('#login');
				if(!form[0].checkValidity())
					form.find(':submit').click();
				else{
					$.ajax({
						url: '/user/login',
						method: 'POST',
						dataType: 'json',
						data: {
							email:this.email,
							password:this.password
						},
						success: function (data) {
							if(data.auth){
								toastr['success']('Successfully logged in!', 'Authenticated');
								setTimeout(function(){ window.location.replace('/user/index'); }, 2350);
							} else
								toastr['warning']('There was a problem with your username or password', 'Please try again');
						}
					});
					event.preventDefault();
				}
			}
		},
		computed:{

		}
	});
})(window);