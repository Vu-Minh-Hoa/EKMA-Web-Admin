import { v4 } from "uuid";

export const CATEGORY_TEXTS = {
  LECTURER_MANAGMENT: 'Giảng Viên',
  STUDENTS_MANAGMENT: 'Sinh Vien',
  DEPARTMENT_MANAGEMENT: 'Khoa',
  CLASS_MANAGEMENT: 'Lớp tín chỉ',
  GRADES_MANAGEMENT: 'Điểm',
  COURSES_SCHEDULES: 'Lịch học',
};

export const FORMAT_DATE = {
  DATE_DEFAULT: 'YYYY/MM/DD',
  DATE_MONTH: 'MM/DD/YYYY',
  DATE_DAY: 'DD/MM/YYYY'
};


export const CoureseGrad = {
  khoa: [
    {
      id: 'CT',
      name: 'CNTT',
    },
    {
      id: 'DT',
      name: 'DTVT',
    },
    {
      id: 'AT',
      name: 'ATTT',
    },
  ],
  lop: [
    {
      khoa: 'CT',
      id: 'CT5D',
      name: 'CT5D',
    },
    {
      khoa: 'CT',
      id: 'CT5A',
      name: 'CT5A',
    },
    {
      khoa: 'AT',
      id: 'AT17A',
      name: 'AT17A',
    },
    {
      khoa: 'DT',
      id: 'DT4A',
      name: 'DT4A',
    },
  ],
  data: [
    {
      id: v4(),
      khoa: 'CT',
      lop: 'CT5D',
      maSV: 'CT050001',
      hoTen: 'Nguyễn Văn An',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'DT',
      lop: 'DT4A',
      maSV: 'DT040002',
      hoTen: 'Trần Thị Bích Ngọc',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'AT',
      lop: 'AT17A',
      maSV: 'AT170003',
      hoTen: 'Lê Minh Quân',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'CT',
      lop: 'CT5A',
      maSV: 'CT050004',
      hoTen: 'Phạm Thị Lan',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'DT',
      lop: 'DT4A',
      maSV: 'DT040005',
      hoTen: 'Hoàng Văn Sơn',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'AT',
      lop: 'AT17A',
      maSV: 'AT170006',
      hoTen: 'Vũ Thị Mai',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'CT',
      lop: 'CT5D',
      maSV: 'CT050007',
      hoTen: 'Đặng Quốc Dũng',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'DT',
      lop: 'DT4A',
      maSV: 'DT040008',
      hoTen: 'Bùi Thị Hạnh',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'AT',
      lop: 'AT17A',
      maSV: 'AT170009',
      hoTen: 'Trịnh Văn Long',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'CT',
      lop: 'CT5A',
      maSV: 'CT050010',
      hoTen: 'Ngô Thị Thu Trang',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'DT',
      lop: 'DT4A',
      maSV: 'DT040011',
      hoTen: 'Dương Quang Huy',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'AT',
      lop: 'AT17A',
      maSV: 'AT170012',
      hoTen: 'Phùng Thị Nhung',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'CT',
      lop: 'CT5D',
      maSV: 'CT050013',
      hoTen: 'Nguyễn Hoàng Kiệt',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'DT',
      lop: 'DT4A',
      maSV: 'DT040014',
      hoTen: 'Trương Thị Mỹ Linh',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'AT',
      lop: 'AT17A',
      maSV: 'AT170015',
      hoTen: 'Đỗ Minh Tú',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'CT',
      lop: 'CT5A',
      maSV: 'CT050016',
      hoTen: 'Hoàng Thị Phương',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'DT',
      lop: 'DT4A',
      maSV: 'DT040017',
      hoTen: 'Võ Văn Hải',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'AT',
      lop: 'AT17A',
      maSV: 'AT170018',
      hoTen: 'Mai Thị Thuỷ',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'CT',
      lop: 'CT5D',
      maSV: 'CT050019',
      hoTen: 'Lý Minh Trí',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'CT',
      lop: 'CT5D',
      maSV: 'CT050020',
      hoTen: 'Phan Thị Ánh Ngọc',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'DT',
      lop: 'DT4A',
      maSV: 'DT040021',
      hoTen: 'Lê Văn Tùng',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'AT',
      lop: 'AT17A',
      maSV: 'AT170022',
      hoTen: 'Nguyễn Thị Hồng',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'CT',
      lop: 'CT5A',
      maSV: 'CT050023',
      hoTen: 'Trần Minh Quang',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'DT',
      lop: 'DT4A',
      maSV: 'DT040024',
      hoTen: 'Võ Thị Thanh Hà',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'AT',
      lop: 'AT17A',
      maSV: 'AT170025',
      hoTen: 'Đỗ Văn Hoàng',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'CT',
      lop: 'CT5D',
      maSV: 'CT050026',
      hoTen: 'Lý Thị Bích Trâm',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'DT',
      lop: 'DT4A',
      maSV: 'DT040027',
      hoTen: 'Ngô Quang Hưng',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'AT',
      lop: 'AT17A',
      maSV: 'AT170028',
      hoTen: 'Phạm Thị Ngọc Anh',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'CT',
      lop: 'CT5A',
      maSV: 'CT050029',
      hoTen: 'Hoàng Văn Thắng',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'DT',
      lop: 'DT4A',
      maSV: 'DT040030',
      hoTen: 'Trương Thị Hương',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'AT',
      lop: 'AT17A',
      maSV: 'AT170031',
      hoTen: 'Bùi Quốc Anh',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'CT',
      lop: 'CT5D',
      maSV: 'CT050032',
      hoTen: 'Mai Thị Thuỳ Linh',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'DT',
      lop: 'DT4A',
      maSV: 'DT040033',
      hoTen: 'Vũ Đình Trọng',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'AT',
      lop: 'AT17A',
      maSV: 'AT170034',
      hoTen: 'Đặng Thị Minh Tâm',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'CT',
      lop: 'CT5A',
      maSV: 'CT050035',
      hoTen: 'Lê Hoàng Nam',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'DT',
      lop: 'DT4A',
      maSV: 'DT040036',
      hoTen: 'Nguyễn Thị Phương Thảo',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'AT',
      lop: 'AT17A',
      maSV: 'AT170037',
      hoTen: 'Trần Văn Hiếu',
      gioiTinh: 'Nam',
    },
    {
      id: v4(),
      khoa: 'CT',
      lop: 'CT5D',
      maSV: 'CT050038',
      hoTen: 'Phùng Thị Mai Anh',
      gioiTinh: 'Nữ',
    },
    {
      id: v4(),
      khoa: 'DT',
      lop: 'DT4A',
      maSV: 'DT040039',
      hoTen: 'Dương Minh Tuấn',
      gioiTinh: 'Nam',
    },
  ],
}

