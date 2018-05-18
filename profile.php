<?php
session_start();
function get_title(){
	echo "User Profile";
} 
require_once './partials/heading.php';
require_once './lib/connect.php';

$user = $_SESSION['user'];
$user_qry = "SELECT * FROM users WHERE userUid = '$user'";
$result_user = mysqli_query($conn,$user_qry);

$userinfo = mysqli_fetch_assoc($result_user);


?>
<main class="content">
	<?php
	require_once './partials/navbar.php';
	?>

	<!-- Start your project here-->
	<div class="grid profile">

		<p class="h4 text-center mb-4 p-head" data-userid ="<?= $userinfo['id']?>"><?= $userinfo['userUid']?>'s Profile</p>
		<span class="profilespan"></span>

		<div class="grid userinfo">
			<div class="grid userdetail">
				<h5 class="grid">First Name:</h5>
				<input type="text" name="userFirstName" value="<?= $userinfo['userFirstName']; ?>" readonly class="form-control nice-border" placeholder="Click the pencil to edit" id="userFirstNameinput">
				<button type="button" class="btn waves-effect userFirstNamebtn"><i class="fa fa-pencil" aria-hidden="true"></i></button>
			</div>
			<div class="grid userdetail">
				<h5 class="grid">Last Name:</h5>
				<input type="text" name="userLastName" value="<?= $userinfo['userLastName']; ?>" readonly class="form-control nice-border" placeholder="Click the pencil to edit"
					id="userLastNameinput">
				<button type="button" class="btn waves-effect userLastNamebtn"><i class="fa fa-pencil" aria-hidden="true"></i></button>
			</div>
			<div class="grid userdetail">
				<h5 class="grid">Email:</h5>
				<input type="email" name="userEmail" value="<?= $userinfo['userEmail']; ?>" readonly class="form-control nice-border" placeholder="Click the pencil to edit" id="userEmailinput">
				<button type="button" class="btn waves-effect userEmailbtn"><i class="fa fa-pencil" aria-hidden="true"></i></button>
			</div>
			<div class="grid userdetail">
				<h5 class="grid">City:</h5>
				<input type="text" name="userCity" value="<?= $userinfo['userCity']; ?>" readonly class="form-control nice-border" placeholder="Click the pencil to edit" id="userCityinput">
				<button type="button" class="btn waves-effect userCitybtn"><i class="fa fa-pencil" aria-hidden="true"></i></button>
			</div>
		</div>

		<div class="grid buttons">
		<button type="button" class="btn btn-outline-danger waves-effect deactivate" data-toggle="modal" data-target="#deactivate-account">Deactivate</button> 

		<button type="button" class="btn waves-effect profilesave">Save</button>
		</div>

	</div> 

	<!-- Modal -->
	<div class="modal fade" id="deactivate-account" tabindex="-1" role="dialog" aria-labelledby="deactivate-account" aria-hidden="true">
		<div class="modal-dialog modal-dialog-centered" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">Are you sure you want to deactivate?</h5>
					<button type="button" class="close" data-dismiss="modal" aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>
				<div class="modal-body">
					<p>We are sad to see you go by. Have a good time.</p>
				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-success nice-border"><a href="./lib/deactivate.php">Deactivate</a></button>
					<button type="button" class="btn btn-danger nice-border" data-dismiss="modal">Close</button>
				</div>
			</div>
		</div>
	</div>



	<!-- /Project ends here-->

</main>

<?php 
require_once './partials/footer.php';
?>

