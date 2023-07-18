import { Order } from "../models/schemas/order.model";

const XLSX = require("xlsx");

async function convertJsonToExcel(req, res) {
  const now = new Date();
  const startOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    0,
    0,
    0
  );
  const endOfDay = new Date(
    now.getFullYear(),
    now.getMonth(),
    now.getDate(),
    23,
    59,
    59
  );
  const orders = await Order.find({
    createAt: { $gte: startOfDay, $lte: endOfDay },
    status: "success",
  })
    .populate("userID")
    .populate("foods.food");
  let arrOrder = [];

  if (orders.length > 0 && orders) {
    orders.forEach((item, index) => {
      let foods = "";
      item.foods.forEach((food) => {
        // @ts-ignore
        foods +=
          food.quantity > 1
            ? // @ts-ignore
              food.quantity + " x " + food.food.name + " , "
            : // @ts-ignore
              food.food.name + " , ";
      });
      // @ts-ignore
      let order = {
        stt: index + 1,
        // @ts-ignore
        name: item.userID.fullName,
        // @ts-ignore
        class: item.userID.className,
        order: foods,
      };
      arrOrder.push(order);
    });
  }

  const workSheet = XLSX.utils.json_to_sheet(arrOrder);
  const workBook = XLSX.utils.book_new();

  XLSX.utils.book_append_sheet(workBook, workSheet, "students");
  // Generate buffer
  await XLSX.write(workBook, { bookType: "xlsx", type: "buffer" });
  // Binary string
  await XLSX.write(workBook, { bookType: "xlsx", type: "binary" });
  await XLSX.writeFile(workBook, "exportExcel.xlsx");
}
export default convertJsonToExcel;
