import { useState } from "react";

function InterestCalculator() {
  const [amount, setAmount] = useState("");
  const [rate, setRate] = useState("");
  const [target, setTarget] = useState("");
  const [results, setResults] = useState([]);
  const [error, setError] = useState("");

  const calculateInterest = () => {
    let principal = parseFloat(amount);
    let interestRate = parseFloat(rate) / 100;
    let goal = parseFloat(target);
    let year = 2025;
    let data = [];

    // Kiểm tra xem người dùng đã nhập hợp lệ chưa
    if (isNaN(principal) || isNaN(interestRate) || isNaN(goal)) {
      setError("Vui lòng nhập đầy đủ số hợp lệ!");
      return;
    }

    // Kiểm tra điều kiện mục tiêu phải lớn hơn số tiền gửi ban đầu
    if (goal <= principal) {
      setError("Mục tiêu phải lớn hơn số tiền gửi ban đầu!");
      return;
    }

    setError(""); // Xóa lỗi trước đó nếu có

    while (true) {
      let afterInterest = principal + principal * interestRate; // Tính số tiền sau lãi

      // Nếu số tiền sau lãi >= mục tiêu, thì dừng ngay, không thêm vào bảng
      if (afterInterest >= goal) {
        break;
      }

      data.push({
        year,
        deposit: principal.toFixed(2), // Số tiền gửi của năm đó
        interestRate: rate, // Lãi suất
        result: afterInterest.toFixed(2), // Số tiền sau khi tính lãi
      });

      principal = afterInterest; // Cập nhật số tiền gửi của năm tiếp theo
      year++;
    }

    setResults(data);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial" }}>
      <h2>Tính Lãi Suất</h2>
      <div>
        <label>
          Số tiền gửi ban đầu:
          <input
            type="number"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>
          Lãi suất (%):
          <input
            type="number"
            value={rate}
            onChange={(e) => setRate(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <div style={{ marginTop: "10px" }}>
        <label>
          Mục tiêu:
          <input
            type="number"
            value={target}
            onChange={(e) => setTarget(e.target.value)}
            style={{ marginLeft: "10px" }}
          />
        </label>
      </div>
      <button onClick={calculateInterest} style={{ marginTop: "15px" }}>
        Tính
      </button>

      {error && <p style={{ color: "red", marginTop: "10px" }}>{error}</p>}

      <table
        border="1"
        style={{ marginTop: "20px", borderCollapse: "collapse" }}
      >
        <thead>
          <tr>
            <th style={{ padding: "5px" }}>Năm</th>

            <th style={{ padding: "5px" }}>Số tiền gửi</th>
            <th style={{ padding: "5px" }}>Lãi suất (%)</th>
            <th style={{ padding: "5px" }}>Số tiền sau khi lãi</th>
          </tr>
        </thead>
        <tbody>
          {results.map((item, index) => (
            <tr key={index}>
              <td style={{ padding: "5px", textAlign: "center" }}>
                {item.year}
              </td>
              <td style={{ padding: "5px", textAlign: "center" }}>
                {item.deposit}
              </td>
              <td style={{ padding: "5px", textAlign: "center" }}>
                {item.interestRate}
              </td>
              <td style={{ padding: "5px", textAlign: "center" }}>
                {item.result}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default InterestCalculator;
