<?php
require_once "../../backend/security/admin_check.php";
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
  <link rel="stylesheet" href="css/rewards.css" />
  <title>Profile</title>
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
    <a href="index.html" class="brand">
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
        <a href="../auth/index.html">Log Out</a>
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
    <a href="challenges.php"><img src="images/challenge.png" alt="Reviews Submission" />Challenges
      Management</a>
    <a href="badges.php"><img src="images/badge.png" alt="Reviews Submission" />Badges
      Management</a>

    <a href="rewards.php" class="active" aria-current="page"><img src="images/reward.png" alt="Reviews Submission" />Reward
      Management</a>

    <br />
    <br />
    <p>Account</p>
    <a href="profile.php"><img src="images/profile.png" alt="Reviews Submission" />Profile</a>
    <a href="../auth/index.html"><img src="images/logout.png" alt="Reviews Submission" />Log Out</a>
  </nav>
  <!-- ============ PAGE CONTENT: leaderboard Submission ============ -->
  <main class="main">
    <h1>Rewards Management</h1>
    <p>
      This page is use to create, update, delete, and view all the rewards
    </p>
    <hr />

    <div class="message" id="message"></div>

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

    <div id="rewards" class="reward-grid"></div>

    <!-- Create -->
    <dialog id="createDialog">
      <div class="dialog-head">
        <h2>Create Reward</h2>
        <button class="btn-close" id="dialogCreateClose" type="button" aria-label="Close">✕</button>
      </div>

      <form action="../../backend/api/admin/rewards.php" method="POST" enctype="multipart/form-data">
        <div class="dialog-body">
          <dl class="dialog-info">
            <dt>Reward Item</dt>
            <dd><input type="text" id="createRewardItem" name="reward_item" required placeholder="Bottle" /></dd>

            <dt>Description</dt>
            <dd><textarea id="createDescription" name="description" required></textarea></dd>

            <dt>Points Cost</dt>
            <dd><input type="number" id="createPointsCost" name="points_cost" min="1" required placeholder="150" /></dd>

            <dt>Stock</dt>
            <dd><input type="number" id="createStock" name="stock" min="0" required placeholder="10" /></dd>

            <dt>Image</dt>
            <dd><input type="file" id="createImage" name="image" accept="image/png,image/jpeg,image/webp" /></dd>
          </dl>
        </div>
        <button class="btn-done" type="submit">Create</button>
      </form>
    </dialog>

    <!-- Update -->
    <dialog id="updateDialog">
      <div class="dialog-head">
        <h2>Update Reward</h2>
        <button class="btn-close" id="dialogUpdateClose" type="button" aria-label="Close">✕</button>
      </div>

      <form action="../../backend/api/admin/rewards.php" method="POST" enctype="multipart/form-data">
        <input type="hidden" name="_method" value="PUT">
        <input type="hidden" name="id" id="updateRewardId">
        <input type="hidden" name="old_image" id="updateOldImage">

        <div class="dialog-body">
          <dl class="dialog-info">
            <dt><label for="updateRewardItem">Reward Item</label></dt>
            <dd><input type="text" id="updateRewardItem" name="reward_item" required></dd>

            <dt><label for="updateDescription">Description</label></dt>
            <dd><textarea id="updateDescription" name="description" required></textarea></dd>

            <dt><label for="updatePointsCost">Points Cost</label></dt>
            <dd><input type="number" id="updatePointsCost" name="points_cost" min="1" required></dd>

            <dt><label for="updateStock">Stock</label></dt>
            <dd><input type="number" id="updateStock" name="stock" min="0" required></dd>

            <dt><label for="updateImage">Image</label></dt>
            <dd><input type="file" id="updateImage" name="image" accept="image/png,image/jpeg,image/webp"></dd>
          </dl>
        </div>
        <button class="btn-done" type="submit">Save</button>
      </form>
    </dialog>

    <!-- hidden form for delete -->
    <form action="../../backend/api/admin/rewards.php" method="POST" id="deleteForm">
      <input type="hidden" name="_method" value="DELETE">
      <input type="hidden" name="id" id="deleteRewardId">
    </form>

  </main>
  <script src="js/admin.js"></script>
  <script src="js/rewards.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
</body>

</html>