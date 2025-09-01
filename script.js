// Default data from the image
      const defaultData = [
        {
          description: "D/Tube",
          item: "Stopper / Guide",
          numPcs: 1,
          process: "Tagging",
          timeSeconds: 27,
        },
        {
          description: "D/Tube",
          item: "Stopper / Guide",
          numPcs: 1,
          process: "Welding",
          timeSeconds: 30,
        },
        {
          description: "T/Tube",
          item: "Stopper / Guide",
          numPcs: 2,
          process: "Tagging",
          timeSeconds: 20,
        },
        {
          description: "T/Tube",
          item: "Stopper / Guide",
          numPcs: 2,
          process: "Welding",
          timeSeconds: 22.5,
        },
        {
          description: "Chain Stay",
          item: "End - L",
          numPcs: 1,
          process: "Tagging",
          timeSeconds: 35,
        },
        {
          description: "Chain Stay",
          item: "End - L",
          numPcs: 1,
          process: "Welding",
          timeSeconds: 32,
        },
        {
          description: "Chain Stay",
          item: "End - R",
          numPcs: 1,
          process: "Tagging",
          timeSeconds: 36,
        },
        {
          description: "Chain Stay",
          item: "End - R",
          numPcs: 1,
          process: "Welding",
          timeSeconds: 35,
        },
        {
          description: "Chain Stay",
          item: "Stopper / Guide",
          numPcs: 1,
          process: "Tagging",
          timeSeconds: 30,
        },
        {
          description: "Chain Stay",
          item: "Stopper / Guide",
          numPcs: 1,
          process: "Welding",
          timeSeconds: 34,
        },
      ];
      // Get order quantity input
      const orderQtyInput = document.getElementById("orderQty");
      // Get table body
      const tableBody = document.querySelector("#productionTable tbody");
      // Initialize the table
      function initializeTable() {
        tableBody.innerHTML = "";
        defaultData.forEach((item, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
                    <td>${item.description}</td>
                    <td>${item.item}</td>
                    <td class="editable"><input type="number" class="numPcs" data-index="${index}" value="${item.numPcs}" min="1"></td>
                    <td>${item.process}</td>
                    <td class="editable"><input type="number" class="timeSeconds" data-index="${index}" value="${item.timeSeconds}" step="0.01" min="0.01"></td>
                    <td class="perHourCapacity">0.00</td>
                    <td class="requiredHours">0.00</td>
                `;
          tableBody.appendChild(row);
        });
        // Add event listeners to all inputs
        document.querySelectorAll(".numPcs, .timeSeconds").forEach((input) => {
          input.addEventListener("input", calculateRow);
        });
        // Add event listener to order quantity
        orderQtyInput.addEventListener("input", calculateAllRows);
        // Calculate all rows initially
        calculateAllRows();
      }
      function calculateRow(event) {
        const input = event.target;
        const index = input.dataset.index;
        const row = input.closest("tr");
        const numPcs = parseFloat(row.querySelector(".numPcs").value) || 0;
        const timeSeconds =
          parseFloat(row.querySelector(".timeSeconds").value) || 0;
        // Calculate per hour capacity with corrected formula
        let perHourCapacity = 0;
        if (timeSeconds > 0 && numPcs > 0) {
          perHourCapacity = 3600 / (numPcs * timeSeconds);
        }
        // Calculate required hours
        const orderQty = parseFloat(orderQtyInput.value) || 0;
        let requiredHours = 0;
        if (perHourCapacity > 0) {
          requiredHours = orderQty / perHourCapacity;
        }
        // Update the row
        row.querySelector(".perHourCapacity").textContent =
          perHourCapacity.toFixed(2);
        row.querySelector(".requiredHours").textContent =
          requiredHours.toFixed(2);
        // Update total
        updateTotalHours();
      }
      function calculateAllRows() {
        document
          .querySelectorAll("#productionTable tbody tr")
          .forEach((row) => {
            const numPcs = parseFloat(row.querySelector(".numPcs").value) || 0;
            const timeSeconds =
              parseFloat(row.querySelector(".timeSeconds").value) || 0;
            // Calculate per hour capacity with corrected formula
            let perHourCapacity = 0;
            if (timeSeconds > 0 && numPcs > 0) {
              perHourCapacity = 3600 / (numPcs * timeSeconds);
            }
            // Calculate required hours
            const orderQty = parseFloat(orderQtyInput.value) || 0;
            let requiredHours = 0;
            if (perHourCapacity > 0) {
              requiredHours = orderQty / perHourCapacity;
            }
            // Update the row
            row.querySelector(".perHourCapacity").textContent =
              perHourCapacity.toFixed(2);
            row.querySelector(".requiredHours").textContent =
              requiredHours.toFixed(2);
          });
        // Update total
        updateTotalHours();
      }
      function updateTotalHours() {
        let total = 0;
        document.querySelectorAll(".requiredHours").forEach((cell) => {
          total += parseFloat(cell.textContent) || 0;
        });
        document.getElementById("totalHours").textContent = total.toFixed(2);
      }
      function resetForm() {
        orderQtyInput.value = 1000;
        initializeTable();
      }
      function goHome() {
        alert("Navigating to home page...");
      }
      function printPreview() {
        window.print();
      }
      // Initialize the table when the page loads
      document.addEventListener("DOMContentLoaded", initializeTable);
   