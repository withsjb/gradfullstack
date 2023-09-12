const mongoose = require("mongoose");
const { Schema } = mongoose;

const QnABoardSchema = new Schema({
  title: String, //제목
  content: String, //내용
  author: String, //작성자
  date: { type: Date, default: Date.now }, //작성일
  views: { type: Number, default: 0 }, //조회수
  comments: [{ content: String, author: String }], //댓글
  likes: { type: Number, default: 0 }, //좋아요
  tags: [String], //태그
  image: String, //이미지 또는 첨부파일
  isPublic: Boolean, //공개 여부
  category: String, //카테고리
  lastModified: { type: Date, default: Date.now }, //수정일
});

module.exports = mongoose.model("QnABoard", QnABoardSchema);
