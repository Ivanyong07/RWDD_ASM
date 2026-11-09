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
  <link rel="stylesheet" href="css/profile.css" />
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
    <a href="history.html"><img src="images/history.png" alt="Reviews Submission" />History</a>
    <br />
    <br />
    <p>Management</p>
    <a href="users.php"><img src="images/user.png" alt="Reviews Submission" />User
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
    <a href="profile.php" class="active" aria-current="page"><img src="images/profile.png" alt="Reviews Submission" />Profile</a>
    <a href="../auth/index.html"><img src="images/logout.png" alt="Reviews Submission" />Log Out</a>
  </nav>
  <!-- ============ PAGE CONTENT: profile page ============ -->
  <main class="main">
    <h1>Profile</h1>
    <p>This page is use to see own profile</p>
    <hr />

    <section class="card profile-card fade">
      <div class="cover" id="cover"></div>

      <div class="profile-body">
        <div class="stat-group" id="statsLeft"></div>

        <div class="who">
          <div class="avatar-xl" id="profileAvatar"></div>
          <h2 id="profileName"></h2>
          <div id="profileRole"></div>
        </div>

        <div class="stat-group stat-group--right" id="statsRight"></div>
      </div>

      <div class="profile-tabs" role="tablist" aria-label="Profile sections">
        <button class="ptab" role="tab" data-tab="overview" aria-selected="true">
          <img src="images/profile.png" alt="Overview">
          Overview
        </button>
        <button class="ptab" role="tab" data-tab="badges" aria-selected="false">
          <img src="images/badge.png" alt="Achievement">
          Badges
        </button>
      </div>
    </section>

    <!-- TAB 1: OVERVIEW -->
    <section id="tab-overview">
      <div class="two-col">
        <div class="card">
          <h2>About</h2>
          <dl class="about" id="aboutList"></dl>
        </div>
        <div class="card">
          <h2>Recent activity</h2>
          <div id="activityList"></div>
        </div>
      </div>
    </section>

    <!-- TAB 2: BADGES -->
    <section id="tab-badges" hidden>
      <div class="section-head">
        <h2>Badges <span class="count-chip" id="badgeCount"></span></h2>
      </div>
      <div class="badge-grid" id="badgeGrid"></div>
    </section>
    </div>
  </main>

  <!-- 6. TOAST (small message at the bottom) -->
  <div class="toast" id="toast" role="status" aria-live="polite"></div>
  <script src="js/admin.js"></script>
  <script src="js/profile.js"></script>
  <script src="https://cdnjs.cloudflare.com/ajax/libs/Chart.js/4.4.1/chart.umd.min.js"></script>
</body>

</html>