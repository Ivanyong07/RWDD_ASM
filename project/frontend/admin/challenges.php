<?php
require_once "../../backend/security/admin_check.php";
?>

<!DOCTYPE html>
<html lang="en">

<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">

  <title>Challenges Management | Fun Collectors</title>

  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>

  <link href="https://fonts.googleapis.com/css2?family=Figtree:wght@400;500;600;700&display=swap" rel="stylesheet">

  <link rel="stylesheet" href="css/admin.css">
  <link rel="stylesheet" href="css/challenges.css">
</head>

<body>

  <!-- Loading Transition -->
  <div id="swap">
    <div class="band"></div>
    <div class="band"></div>
    <div class="band">
      <h1>Fun Collectors</h1>
    </div>
    <div class="band"></div>
  </div>

  <!-- Header -->
  <header class="topbar">

    <a href="index.php" class="brand">
      <span class="logo">
        <img src="../images/lee.jpeg" alt="Fun Collectors Logo">
      </span>
      Fun Collectors
    </a>

    <div class="top-right">
      <button class="icon-btn" id="bellBtn" aria-label="Notifications">
        <img src="../images/notification.jpeg" alt="Notifications">
      </button>
    </div>

    <div class="user-wrap">

      <button class="user" id="userBtn" aria-haspopup="true" aria-expanded="false">
        <img src="../images/lee.jpeg" alt="Profile picture">
      </button>

      <div class="menu" id="userMenu" hidden>
        <div class="menu-info">
          <b id="menuRank"></b>
        </div>

        <a href="../auth/index.php">Log Out</a>
      </div>

    </div>

  </header>

  <!-- Sidebar -->
  <nav class="sidebar" aria-label="Dashboard">

    <p>Review</p>

    <a href="index.html">
      <img src="images/review.php" alt="">
      Reviews Submission
    </a>

    <a href="leaderboard.html">
      <img src="images/leaderboard.png" alt="">
      Leaderboard
    </a>

    <a href="history.php">
      <img src="images/history.png" alt="">
      History
    </a>

    <br><br>

    <p>Management</p>

    <a href="users.php">
      <img src="images/user.png" alt="">
      User Management
    </a>

    <a href="challenges.php" class="active" aria-current="page">
      <img src="images/challenge.png" alt="">
      Challenges Management
    </a>

    <a href="achievement.php">
      <img src="images/badge.png" alt="">
      Badges Management
    </a>

    <a href="rewards.php">
      <img src="images/reward.png" alt="">
      Reward Management
    </a>

    <br><br>

    <p>Account</p>

    <a href="profile.php">
      <img src="images/profile.png" alt="">
      Profile
    </a>

    <a href="../auth/index.php">
      <img src="images/logout.png" alt="">
      Log Out
    </a>

  </nav>

  <!-- Main Content -->
  <main class="main">

    <div class="page-heading">
      <h1>Challenges Management</h1>
      <p>Manage environmental challenges, rewards and deadlines.</p>
    </div>

    <hr>

    <!-- Search and Create -->
    <div class="header">

      <label class="search">
        <img src="images/search.png" alt="">

        <input
          type="search"
          id="search"
          placeholder="Search challenges..."
          aria-label="Search challenges">
      </label>

      <button class="btn-create" id="btnCreateChallenge">
        + Create Challenge
      </button>

    </div>

    <!-- Challenge Table -->
    <div class="table">

      <section class="table-body">

        <table>

          <thead>
            <tr>
              <th>Challenge ID</th>
              <th>Title</th>
              <th>Category</th>
              <th>Deadline</th>
              <th>Created By</th>
              <th>Action</th>
            </tr>
          </thead>

          <tbody id="challengeBody">
          </tbody>

        </table>

      </section>

    </div>

    <!-- Create Challenge Dialog -->
    <dialog id="createDialog">

      <div class="dialog-head">
        <h2>Create Challenge</h2>

        <button class="btn-close" id="dialogCreateClose" aria-label="Close">
          ✕
        </button>
      </div>

      <div class="dialog-body">

        <form
          action="../../backend/api/admin/challenge.php"
          method="POST"
          enctype="multipart/form-data">

          <dl class="dialog-info">

            <dt>Title</dt>
            <dd>
              <input
                type="text"
                id="createTitle"
                name="title"
                required
                placeholder="Collect Tin">
            </dd>

            <dt>Quantity</dt>
            <dd>
              <input
                type="number"
                id="createQuantity"
                name="quantity"
                min="1"
                required
                placeholder="1">
            </dd>

            <dt>Description</dt>
            <dd>
              <textarea
                name="description"
                id="createDescription"
                placeholder="Describe this challenge..."></textarea>
            </dd>

            <dt>Category</dt>
            <dd>
              <select name="category" id="createCategory" required>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </dd>

            <dt>Points Reward</dt>
            <dd>
              <input
                type="number"
                id="createPointsReward"
                name="points_reward"
                min="0"
                required
                placeholder="180">
            </dd>

            <dt>XP Reward</dt>
            <dd>
              <input
                type="number"
                id="createXpReward"
                name="xp_reward"
                min="0"
                required
                placeholder="180">
            </dd>

            <dt>Deadline</dt>
            <dd>
              <input
                type="datetime-local"
                id="createDeadline"
                name="deadline"
                required>
            </dd>

            <dt>Image</dt>
            <dd>
              <input
                type="file"
                name="image"
                id="createImage"
                accept="image/png,image/jpeg,image/webp">
            </dd>

            <dt>Location</dt>
            <dd>
              <select name="location" id="createLocation" required>
                <option value="block_c">Block C</option>
                <option value="block_a">Block A</option>
              </select>
            </dd>

          </dl>

          <button type="submit">
            Create Challenge
          </button>

        </form>

      </div>

    </dialog>

    <!-- View Challenge Dialog -->
    <dialog id="viewDialog">

      <div class="dialog-head">

        <h2>Challenge Details</h2>

        <button class="btn-close" id="dialogViewClose" aria-label="Close">
          ✕
        </button>

      </div>

      <div class="dialog-body">

        <img src="" alt="Challenge image" id="image">
        <dl class="dialog-info">

          <dt>Challenge ID</dt>
          <dd id="challengeId"></dd>

          <dt>Title</dt>
          <dd id="title"></dd>

          <dt>Description</dt>
          <dd id="description"></dd>

          <dt>Category</dt>
          <dd id="category"></dd>

          <dt>Points Reward</dt>
          <dd id="pointsReward"></dd>

          <dt>XP Reward</dt>
          <dd id="xpReward"></dd>

          <dt>Deadline</dt>
          <dd id="deadline"></dd>

          <dt>Location</dt>
          <dd id="location"></dd>

        </dl>

      </div>

      <button class="btn-done" id="dialogViewDone">
        Done
      </button>

    </dialog>

    <!-- Update Challenge Dialog -->
    <dialog id="updateDialog">

      <div class="dialog-head">

        <h2>Update Challenge</h2>

        <button class="btn-close" id="dialogUpdateClose" aria-label="Close">
          ✕
        </button>

      </div>

      <div class="dialog-body">

        <form
          action="../../backend/api/admin/challenge.php"
          method="POST"
          enctype="multipart/form-data">

          <input type="hidden" name="_method" value="PUT">

          <dl class="dialog-info">

            <dt>Challenge ID</dt>
            <dd>
              <input
                type="text"
                id="updateChallengeId"
                name="challenge_id"
                readonly>
            </dd>

            <dt>Title</dt>
            <dd>
              <input
                type="text"
                id="updateTitle"
                name="title"
                required>
            </dd>

            <dt>Description</dt>
            <dd>
              <textarea
                id="updateDescription"
                name="description"></textarea>
            </dd>

            <dt>Category</dt>
            <dd>
              <select id="updateCategory" name="category" required>
                <option value="beginner">Beginner</option>
                <option value="intermediate">Intermediate</option>
                <option value="advanced">Advanced</option>
              </select>
            </dd>

            <dt>Points Reward</dt>
            <dd>
              <input
                type="number"
                id="updatePointsReward"
                name="points_reward"
                min="0"
                required>
            </dd>

            <dt>XP Reward</dt>
            <dd>
              <input
                type="number"
                id="updateXpReward"
                name="xp_reward"
                min="0"
                required>
            </dd>

            <dt>Deadline</dt>
            <dd>
              <input
                type="datetime-local"
                id="updateDeadline"
                name="deadline"
                required>
            </dd>

            <dt>Image</dt>
            <dd>
              <input
                type="file"
                id="updateImage"
                name="image"
                accept="image/png,image/jpeg,image/webp">
            </dd>

            <dt>Location</dt>
            <dd>
              <select id="updateLocation" name="location" required>
                <option value="level_a">Level A</option>
                <option value="level_b">Level B</option>
                <option value="level_c">Level C</option>
              </select>
            </dd>

          </dl>
          <button type="submit">
            Save Changes
          </button>
        </form>
      </div>
    </dialog>
  </main>

  <form action="../../backend/api/admin/challenge.php" method="POST" id="deleteForm">
    <input type="hidden" name="_method" value="DELETE">
    <input type="hidden" name="id" id="deleteChallengeId">
  </form>

  <!-- JavaScript -->
  <script src="js/admin.js"></script>
  <script src="js/challenges.js"></script>

  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>

</body>

</html>