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
  <link rel="stylesheet" href="css/achievement.css" />
  <title>Challenges</title>
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
    <a href="users.php"><img src="images/user.png" alt="Reviews Submission" />User
      Management</a>
    <a href="challenges.phpl"><img src="images/challenge.png" alt="Reviews Submission" />Challenges
      Management</a>
    <a href="badges.php" class="active" aria-current="page"><img src="images/badge.png" alt="Reviews Submission" />Badges
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
    <h1>Badges Management</h1>
    <p>
      This page is used to create, update, delete, and view all the badges
    </p>
    <hr />

    <div class="message"></div>

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

    <div id="achievement"></div>

    <!-- Create -->
    <dialog id="createBadgesDialog">
      <div class="dialog-head">
        <h2>User <span id="dId"></span></h2>
        <button
          class="btn-close"
          id="dialogCreateBadgesClose"
          aria-label="Close">
          ✕
        </button>
      </div>

      <div class="dialog-body">
        <dl class="dialog-info">

          <form action="../../backend/api/admin/achievement.php" method="POST">
            <dt>Achievement Name</dt>
            <input
              type="text"
              id="createName"
              required
              placeholder="Beginner Tin" />

            <dt>Achievement Description</dt>
            <textarea name="" id="createDescription"></textarea>

            <dt>Achievement Image</dt>
            <img src="" alt="" id="createImage" />

            <dt>Requirement Value</dt>
            <input type="number" id="createAge" required placeholder="18" />
          </form>
        </dl>
      </div>
    </dialog>

    <!-- Update -->
    <dialog id="updateDialog">
      <div class="dialog-head">
        <h2>Update Achievement</h2>
        <button class="btn-close" id="dialogUpdateClose" type="button" aria-label="Close">✕</button>
      </div>

      <form action="../../backend/api/admin/achievement.php" method="POST">
        <input type="hidden" name="_method" value="PUT" />
        <input type="hidden" name="id" id="updateAchievementId" />

        <div class="dialog-body">
          <dl class="dialog-info">

            <dt><label for="updateAchievementName">Achievement Name</label></dt>
            <dd><input type="text" id="achievement_image" name="achievement_name" /></dd>

            <dt><label for="updateAchievementDescription">Achievement Description</label></dt>
            <dd><input type="email" id="achievement_image" name="achievement_description" /></dd>

            <dt><label for="updateAchievementImage">Achievement Image</label></dt>
            <dd><input type="number" id="achievement_image" name="achievement_image" /></dd>

            <dt><label for="updateRequirementValue">Requirement Value</label></dt>
            <dd><input type="number" id="requirement_value" name="requirement_value" /></dd>
          </dl>
        </div>
        <button class="btn-done" type="submit">Save</button>
      </form>
    </dialog>

    <!-- hidden form for delete -->
    <form action="../../backend/api/admin/achievement.php" method="POST">
      <input type="hidden" name="_method" value="DELETE">
      <input type="hidden" name="id" id="deleteAchievementId">
    </form>


  </main>
  <script src="js/admin.js"></script>
  <script src="js/achievement.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
</body>

</html>