<?php
require_once "../../backend/auth/admin_check.php";
?>


<!doctype html>
<html lang="en">

<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />

  <link rel="preconnect" href="https://fonts.googleapis.com" />
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin />

  <link rel="stylesheet" href="css/admin.css" />
  <link
    href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap"
    rel="stylesheet" />
  <link rel="stylesheet" href="css/users.css" />
  <title>Users</title>
</head>

<body>
  <div id="swap">
    <div class="band"></div>
    <div class="band"></div>
    <div class="band">
      <h1>Fun Collectors</h1>
    </div>
    <div class="band"></div>
  </div>

  <header class="topbar">
    <a href="index.php" class="brand">
      <span class="logo">
        <img src="../images/lee.jpeg" alt="Fun Collectors Logo" />
      </span>
      Fun Collectors
    </a>

    <div class="top-right">
      <button class="icon-btn" id="bellBtn" aria-label="Notifications">
        <img src="../images/notification.jpeg" alt="Notifications" />
      </button>
    </div>

    <div class="user-wrap">
      <button
        class="user"
        id="userBtn"
        aria-haspopup="true"
        aria-expanded="false">
        <img src="../images/lee.jpeg" alt="Profile picture" />
      </button>

      <div class="menu" id="userMenu" hidden>
        <div class="menu-info"><b id="menuRank"></b></div>
        <a href="../auth/index.php">Log Out</a>
      </div>
    </div>
  </header>

  <nav class="sidebar" aria-label="Dashboard">
    <p>Review</p>
    <a href="index.php">
      <img src="images/review.png" alt="Reviews Submission" />
      Reviews Submission
    </a>
    <a href="leaderboard.php"><img
        src="images/leaderboard.png"
        alt="Reviews Submission" />Leaderboard</a>
    <a href="history.php"><img src="images/history.png" alt="Reviews Submission" />History</a>
    <br />
    <br />
    <p>Management</p>
    <a href="users.php" class="active" aria-current="page"><img src="images/user.png" alt="Reviews Submission" />User
      Management</a>
    <a href="challenges.php"><img src="images/challenge.png" alt="Reviews Submission" />Challenges
      Management</a>
    <a href="badges.php"><img src="images/badge.png" alt="Reviews Submission" />Badges
      Management</a>

    <a href="rewards.php"><img src="images/reward.png" alt="Reviews Submission" />Reward
      Management</a>

    <br />
    <br />
    <p>Account</p>
    <a href="profile.php"><img src="images/profile.png" alt="Reviews Submission" />Profile</a>
    <a href="../auth/index.php"><img src="images/logout.png" alt="Reviews Submission" />Log Out</a>
  </nav>




  <!-- ============ PAGE CONTENT: leaderboard Submission ============ -->
  <main class="main">
    <!-- Title -->
    <h1>Users Managment</h1>
    <p>This page is use create, update, delete, and view all the users</p>
    <hr />

    <!-- Header -->
    <div class="header">
      <label class="search">
        <img src="images/search.png" alt="Search" />
        <input
          type="search"
          id="search"
          placeholder="Search the user"
          aria-label="Search the user" />
      </label>
      <button class="btn-create" id="btnCreate">Create</button>
    </div>

    <!-- Table -->
    <div class="table">
      <section class="table-body">
        <table>
          <thead>
            <tr>
              <th>User ID</th>
              <th>Username</th>
              <th>Email</th>
              <th>TP Number</th>
              <th>Role</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody id="usersBody"></tbody>
        </table>
      </section>
    </div>

    <!-- Create -->
    <dialog id="createDialog">
      <div class="dialog-head">
        <h2>Create User</h2>
        <button class="btn-close" id="dialogCreateClose" type="button" aria-label="Close">
          ✕
        </button>
      </div>

      <form action="../../backend/api/admin/users.php" method="POST">
        <div class="dialog-body">
          <dl class="dialog-info">

            <dt>Username</dt>
            <input
              type="text"
              id="createUsername"
              required
              name="username"
              placeholder="Ivan" />

            <dt>Password</dt>
            <input
              type="password"
              id="createPassword"
              required
              name="password"
              placeholder="********" />

            <dt>Email</dt>
            <input
              type="email"
              id="createEmail"
              required
              name="email"
              placeholder="ivanyong@gmail.com" />

            <dt>Age</dt>
            <input type="number" name="age" id="createAge" required placeholder="18" />

            <dt>TP Number</dt>
            <input
              type="text"
              id="createTpNumber"
              required
              name="tp_number"
              placeholder="TP090955" />

            <dt>Course</dt>
            <input
              type="text"
              id="createCourse"
              name="course"
              required
              placeholder="Diploma in Business" />

            <button type="submit">Create</button>

          </dl>
        </div>
      </form>
    </dialog>


    <!-- View -->
    <dialog id="viewDialog">
      <div class="dialog-head">
        <h2>User Details</h2>
        <button class="btn-close" id="dialogViewClose" aria-label="Close" type="button">
          ✕
        </button>
      </div>

      <div class="dialog-body">
        <dl class="dialog-info">
          <dt>User ID</dt>
          <dd id="viewUserId"></dd>

          <dt>Username</dt>
          <dd id="viewUsername"></dd>

          <dt>Password</dt>
          <dd id="viewPassword"></dd>

          <dt>Email</dt>
          <dd id="viewEmail"></dd>

          <dt>Age</dt>
          <dd id="viewAge"></dd>

          <dt>TP Number</dt>
          <dd id="viewTpNumber"></dd>

          <dt>Course</dt>
          <dd id="viewCourse"></dd>

          <dt>Role</dt>
          <dd id="viewRole"></dd>

          <dt>Total XP</dt>
          <dd id="viewTotalXp"></dd>

          <dt>Rank</dt>
          <dd id="viewRank"></dd>

          <dt>Points Balance</dt>
          <dd id="viewPointsBalance"></dd>

          <dt>Created At</dt>
          <dd id="viewCreatedAt"></dd>
        </dl>
      </div>
      <button class="btn-done" id="btn-done">Done</button>
    </dialog>


    <!-- Update -->
    <dialog id="updateDialog">
      <div class="dialog-head">
        <h2>Update user</h2>
        <button class="btn-close" id="dialogUpdateClose" type="button" aria-label="Close">✕</button>
      </div>

      <form action="../../backend/api/admin/users.php" method="POST">
        <input type="hidden" name="_method" value="PUT" />
        <input type="hidden" name="id" id="updateUserId" />

        <div class="dialog-body">
          <dl class="dialog-info">

            <dt><label for="updateUsername">Username</label></dt>
            <dd><input type="text" id="updateUsername" name="username" /></dd>

            <dt><label for="updateEmail">Email</label></dt>
            <dd><input type="email" id="updateEmail" name="email" /></dd>

            <dt><label for="updateAge">Age</label></dt>
            <dd><input type="number" id="updateAge" name="age" /></dd>

            <dt><label for="updateTpNumber">TP Number</label></dt>
            <dd><input type="text" id="updateTpNumber" name="tp_number" /></dd>

            <dt><label for="updateCourse">Course</label></dt>
            <dd><input type="text" id="updateCourse" name="course" /></dd>

            <dt><label for="updateRole">Role</label></dt>
            <dd>
              <select id="updateRole" name="role">
                <option value="user">User</option>
                <option value="marker">Marker</option>
                <option value="admin">Admin</option>
              </select>
            </dd>

            <dt><label for="updateTotalXp">Total XP</label></dt>
            <dd><input type="number" id="updateTotalXp" name="total_xp" /></dd>

            <dt><label for="updateRank">Rank</label></dt>
            <dd><input type="text" id="updateRank" name="rank" /></dd>

            <dt><label for="updatePointsBalance">Points Balance</label></dt>
            <dd><input type="number" id="updatePointsBalance" name="points_balance" /></dd>

            <dt>Created At</dt>
            <dd><input type="text" id="updateCreatedAt" readonly /></dd>
          </dl>
        </div>
        <button class="btn-done" type="submit">Save</button>
      </form>
    </dialog>


    <!-- hidden form for delete -->
    <form action="../../backend/api/admin/users.php" method="POST" id="deleteForm" hidden>
      <input type="hidden" name="_method" value="DELETE">
      <input type="hidden" name="id" id="deleteUserId">
    </form>
  </main>

  <script src="js/admin.js"></script>
  <script src="js/users.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
</body>

</html>