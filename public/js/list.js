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
					url: '/list/api/all',
					method: 'GET',
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
						toastr['error']('Successfully Deleted that list', 'Deleted');
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