document.addEventListener("DOMContentLoaded", function () {
    const logoutButton = document.getElementById("logout-button");
  
    if (logoutButton) {
      logoutButton.addEventListener("click", async function () {
        try {
          const response = await fetch("/api/users/logout", {
            method: "POST",
          });
  
          if (response.ok) {
            // Redirect or perform actions after successful logout
            window.location.replace("/");
          } else {
            // Handle logout error
            alert("Error logging out");
          }
        } catch (error) {
          console.error("Logout error:", error);
        }
      });
    }
  });