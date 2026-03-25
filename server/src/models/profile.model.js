import mongoose from "mongoose";

const profileSchema = new mongoose.Schema(
  {
    name: { type: String, default: "Hoàng Văn Trọng" },
    avatarUrl: { type: String, default: "" },
    badges: {
      type: [String],
      default: ["Lập trình web, mobile app", "fullstack developer"],
    },
    jobPosition: { type: String, default: "Intern developer" },
    email: { type: String, default: "tronghv.contact@gmail.com" },
    phone: { type: String, default: "0978004644" },
    aboutMe: {
      type: String,
      default:
        "Em chào anh chị! Em là sinh viên mới tốt nghiệp ngành CNTT và. Em có niềm đam mê với công việc lập trình và yêu thích việc tạo ra các trang web và mobile app hiện đại có tính ứng dụng cao.",
    },
    cvUrl: {
      type: String,
      default: "/assets/HoangVanTrong_FullstackDeveloper_Intern.pdf",
    },
  },
  { timestamps: true },
);

export const Profile = mongoose.model("Profile", profileSchema);
