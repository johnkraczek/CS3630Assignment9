(function (exports) {
	exports.register = new Vue({
		el: '#user',
		data: {
			display: '',
			email: {
				value:'',
				taken:false,
				image:'//ssl.gstatic.com/accounts/ui/avatar_2x.png'
			},
			newpassword: '',
			oldpassword:'',
			passwordChk: ''
		},
		methods: {
			chkRegistration:function(event){
				const form = $('#register');
				if(!form[0].checkValidity())
					form.find(':submit').click();
				else{
					if(!this.passwordChk)
						toastr['warning']('Those passwords do not match or are not long enough', 'Please try again');
					else {
						$.ajax({
							url: '/user/register/'+req.session.user,
							method: 'POST',
							dataType: 'json',
							data: {
								password:this.password,
								display:this.display
							},
							success: function (data) {
								if(data.auth){
									toastr['success']('Successfully logged in!', 'Authenticated');
									setTimeout(function(){ window.location.replace('/user/index'); }, 2350);
								} else
									toastr['warning']('There was a problem with your display name or password', 'Please try again');
							}
						});
					}
				}
				event.preventDefault();
			},
			fetchData: function(){
				$.ajax({
					url: '/user/api/fetchUser',
					method: 'GET',
					dataType: 'json',
					success: function (data) {
						if(data.auth){
							user.display = data.display;
							user.email.value = data.email;
							user.email.image = data.email.image;
						}
					}
				});
			}
		},
		computed:{
			passwordChk: function(){
				return (this.password === this.chkPassword) && this.password.length > 4;
			}
		},
	});
})(window);