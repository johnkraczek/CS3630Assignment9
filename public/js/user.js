(function (exports) {
	exports.user = new Vue({
		el: '#user',
		data: {
			display: '',
			email: {
				value:'',
				image:''
			},
			newPassword: '',
			oldPassword: '',
			chkPw: ''
		},
		methods: {
			chkSaveInfo:function(){
				const form = $('#userform');
				if(!form[0].checkValidity())
					form.find(':submit').click();
				else{
					if(!this.passwordChk)
						toastr['warning']('Those passwords do not match or are not long enough', 'Please try again');
					else {
						$.ajax({
							url: '/user/api/updateUser',
							method: 'POST',
							dataType: 'json',
							data: {
								oldPassword: this.oldPassword,
								newPassword: this.newPassword,
								display: this.display
							},
							success: function (data) {
								if(data.auth){
									toastr['success']('Successfully updated your info!', 'Saved Info');
									setTimeout(function(){ window.location.replace('/user/index'); }, 2350);
								} else
									toastr['warning']('There was a problem saving your info. <br>'+ data.msg, 'Please try again');
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
							user.email.image = 'https://www.gravatar.com/avatar/'+data.image+'?s=200&d=%2F%2Fssl.gstatic.com%2Faccounts%2Fui%2Favatar_2x.png';
						}
					}
				});
			}
		},
		computed:{
			passwordChk: function(){
				return ((this.newPassword == this.chkPw) && (this.newPassword.length > 4));
			}
		},
	});
})(window);