(function (exports) {
	function debounce(func, wait, immediate) {
		var timeout;
		return function() {
			var context = this, args = arguments;
			var later = function() {
				timeout = null;
				if (!immediate) func.apply(context, args);
			};
			var callNow = immediate && !timeout;
			clearTimeout(timeout);
			timeout = setTimeout(later, wait);
			if (callNow) func.apply(context, args);
		};
	}
	exports.register = new Vue({
		el: '#register',
		data: {
			display: '',
			email: {
				value:'',
				taken:false
			},
			password: '',
			chkPassword: ''
		},
		methods: {
			chkRegistration:function(event){
				const form = $('#register');
				if(!form[0].checkValidity())
					form.find(':submit').click();
				else{
					if(!this.passwordChk)
						toastr['warning']('Those passwords do not match or are not long enough', 'Please try again');
					else if(this.email.taken){
						toastr['warning']('That email has been taken. ', 'Please try again');
					} else {
						console.log('ok to save to db');

						$.ajax({
							url: '/user/register',
							method: 'POST',
							dataType: 'json',
							data: {
								email:this.email.value,
								password:this.password,
								display:this.display
							},
							success: function (data) {
								if(data.auth){
									toastr['success']('Successfully logged in!', 'Authenticated');
									setTimeout(function(){ window.location.replace('/user/index'); }, 2350);
								} else
									toastr['warning']('There was a problem with your username or password', 'Please try again');
							}
						});
					}
				}
				event.preventDefault();
			},
		},
		computed:{
			passwordChk: function(){
				return (this.password === this.chkPassword) && this.password.length > 4;
			}
		},
		watch:{
			'email.value': debounce(function(){
				//check if the email is valid
				$.ajax({
					url:'/user/emailAvail',
					method: 'POST',
					dataType: 'json',
					data: {
						email: this.email
					},
					success: function(data){
						register.email.taken = data.taken;
					}
				});
			}, 1000)
		}
	});
})(window);