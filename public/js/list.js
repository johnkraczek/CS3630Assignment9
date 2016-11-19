(function (exports) {
	exports.toDoApp = new Vue({
		el: '#toDoApp',
		data: {
			lists:[ {
				id: '',
				title:
				{
					text:'Your List',
					editState:true
				},
				todos:[
					{
						text: 'Hello World',
						checked: false
					}
				]
			} ]
		},
		methods: {
			fetchData: function () {
				$.ajax({
					url: '/list/all',
					method: 'POST',
					dataType: 'json',
					success: function (data) {
						toDoApp.lists = data;
					}
				});
			}, 
			removeList: function(id){
				$.ajax({
					url:'/list/api/delete/'+id,
					method: 'POST', 
					success:function(data){
						toastr['success']('Successfully Deleted that list', 'Saved');
					}
				});
				toDoApp.lists.forEach(list=>{
					if (list.id == id){
						var index = toDoApp.lists.indexOf(list);
						toDoApp.lists.splice(index, 1);
					}
				});
			}
		}
	});
})(window);