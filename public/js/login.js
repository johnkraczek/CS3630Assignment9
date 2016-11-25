(function (exports) {
	exports.toDoApp = new Vue({
		el: '#login',
		data: {
			email: '',
			password: ''
		},
		methods: {
			chkLogin:function(){
				alert('here');
				$.ajax({
					url: '/user/login',
					method: 'POST',
					dataType: 'json',
					data: {
						email:this.email,
						password:this.password
					},
					success: function (data) {
						console.log(data);
					},
					done: function(){
						console.log(data + 'from done');
					},
					completed: function(){
						console.log(data);
					}
				});
			}
		},
		computed:{

		}
	});
})(window);