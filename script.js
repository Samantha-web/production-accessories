// Default data for Steel
      const steelData = [
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
        {
          description: "D/Tube",
          item: "Water Bottle Nut",
          numPcs: 2,
          process: "Brazing",
          timeSeconds: 12.5,
        },
        {
          description: "Seat Stay",
          item: "Carrier Nut",
          numPcs: 2,
          process: "Brazing",
          timeSeconds: 12.5,
        },
      ];

      // Default data for Alloy (same as Steel for now, but can be customized)
      const alloyData = [
        {
          description: "D/Tube",
          item: "Stopper / Guide",
          numPcs: 2,
          process: "Brazing",
          timeSeconds: 30,
        },
        {
          description: "T/Tube",
          item: "Stopper / Guide",
          numPcs: 2,
          process: "Brazing",
          timeSeconds: 30,
        },
        {
          description: "Chain Stay",
          item: "Stopper / Guide",
          numPcs: 2,
          process: "Brazing",
          timeSeconds: 30,
        },
        {
          description: "Seat Stay",
          item: "Stopper / Guide",
          numPcs: 2,
          process: "Brazing",
          timeSeconds: 30,
        },
        {
          description: "Seat Tube",
          item: "Stopper / Guide",
          numPcs: 1,
          process: "Brazing",
          timeSeconds: 30,
        },
        {
          description: "D/Tube",
          item: "Water Bottle Nut",
          numPcs: 2,
          process: "Brazing",
          timeSeconds: 12.5,
        },
        {
          description: "Seat Stay",
          item: "Carrier Nut",
          numPcs: 2,
          process: "Brazing",
          timeSeconds: 12.5,
        },
        {
          description: "Seat Stay",
          item: "Lock Nut",
          numPcs: 2,
          process: "Brazing",
          timeSeconds: 12.5,
        },
        {
          description: "Bridge",
          item: "Mudguard Nut",
          numPcs: 1,
          process: "Brazing",
          timeSeconds: 12.5,
        },
        {
          description: "Chain Stay",
          item: "End - L",
          numPcs: 1,
          process: "Tagging",
          timeSeconds: 20,
        },
        {
          description: "Chain Stay",
          item: "End - L",
          numPcs: 1,
          process: "Welding",
          timeSeconds: 60,
        },
        {
          description: "Chain Stay",
          item: "End - R",
          numPcs: 1,
          process: "Tagging",
          timeSeconds: 20,
        },
        {
          description: "Chain Stay",
          item: "End - R",
          numPcs: 1,
          process: "Welding",
          timeSeconds: 60,
        },
        
        {
          description: "Seat Stay",
          item: "L/R SS - T/Bridge",
          numPcs: 1,
          process: "Tagging",
          timeSeconds: 20,
        },
        {
          description: "Seat Stay",
          item: "L/R SS - T/Bridge",
          numPcs: 1,
          process: "Welding",
          timeSeconds: 90,
        },
      ];

      // Function to switch between tabs
      function switchTab(tabName) {
        // Update tab buttons
        document.querySelectorAll(".tab").forEach((tab) => {
          tab.classList.remove("active");
        });
        event.target.closest(".tab").classList.add("active");

        // Update tab content
        document.querySelectorAll(".tab-content").forEach((content) => {
          content.classList.remove("active");
        });
        document.getElementById(`${tabName}-tab`).classList.add("active");
      }

      // Initialize the table
      function initializeTable(materialType) {
        const tableId =
          materialType === "steel"
            ? "steelProductionTable"
            : "alloyProductionTable";
        const orderQtyId =
          materialType === "steel" ? "steelOrderQty" : "alloyOrderQty";
        const totalHoursId =
          materialType === "steel" ? "steelTotalHours" : "alloyTotalHours";
        const data = materialType === "steel" ? steelData : alloyData;

        const tableBody = document.querySelector(`#${tableId} tbody`);
        tableBody.innerHTML = "";

        data.forEach((item, index) => {
          const row = document.createElement("tr");
          row.innerHTML = `
            <td>${item.description}</td>
            <td>${item.item}</td>
            <td class="editable"><input type="number" class="numPcs" data-material="${materialType}" data-index="${index}" value="${item.numPcs}" min="1"></td>
            <td>${item.process}</td>
            <td class="editable"><input type="number" class="timeSeconds" data-material="${materialType}" data-index="${index}" value="${item.timeSeconds}" step="0.01" min="0.01"></td>
            <td class="perHourCapacity">0.00</td>
            <td class="requiredHours">0.00</td>
          `;
          tableBody.appendChild(row);
        });

        // Add event listeners to all inputs
        document
          .querySelectorAll(`#${tableId} .numPcs, #${tableId} .timeSeconds`)
          .forEach((input) => {
            input.addEventListener("input", calculateRow);
          });

        // Add event listener to order quantity
        document
          .getElementById(orderQtyId)
          .addEventListener("input", () => calculateAllRows(materialType));

        // Calculate all rows initially
        calculateAllRows(materialType);
      }

      function calculateRow(event) {
        const input = event.target;
        const materialType = input.dataset.material;
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
        const orderQtyId =
          materialType === "steel" ? "steelOrderQty" : "alloyOrderQty";
        const orderQty =
          parseFloat(document.getElementById(orderQtyId).value) || 0;
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
        updateTotalHours(materialType);
      }

      function calculateAllRows(materialType) {
        const tableId =
          materialType === "steel"
            ? "steelProductionTable"
            : "alloyProductionTable";
        const orderQtyId =
          materialType === "steel" ? "steelOrderQty" : "alloyOrderQty";

        document.querySelectorAll(`#${tableId} tbody tr`).forEach((row) => {
          const numPcs = parseFloat(row.querySelector(".numPcs").value) || 0;
          const timeSeconds =
            parseFloat(row.querySelector(".timeSeconds").value) || 0;

          // Calculate per hour capacity with corrected formula
          let perHourCapacity = 0;
          if (timeSeconds > 0 && numPcs > 0) {
            perHourCapacity = 3600 / (numPcs * timeSeconds);
          }

          // Calculate required hours
          const orderQty =
            parseFloat(document.getElementById(orderQtyId).value) || 0;
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
        updateTotalHours(materialType);
      }

      function updateTotalHours(materialType) {
        const tableId =
          materialType === "steel"
            ? "steelProductionTable"
            : "alloyProductionTable";
        const totalHoursId =
          materialType === "steel" ? "steelTotalHours" : "alloyTotalHours";

        let total = 0;
        document
          .querySelectorAll(`#${tableId} .requiredHours`)
          .forEach((cell) => {
            total += parseFloat(cell.textContent) || 0;
          });
        document.getElementById(totalHoursId).textContent = total.toFixed(2);
      }

      function resetForm(materialType) {
        const orderQtyId =
          materialType === "steel" ? "steelOrderQty" : "alloyOrderQty";
        document.getElementById(orderQtyId).value = 1000;
        initializeTable(materialType);
      }

      function goHome() {
        alert("Navigating to home page...");
      }

      function printPreview() {
        window.print();
      }

      // Initialize both tables when the page loads
      document.addEventListener("DOMContentLoaded", () => {
        initializeTable("steel");
        initializeTable("alloy");
      });
    
