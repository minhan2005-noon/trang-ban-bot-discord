const danhSachGoi = {
    basic: {
        ten: "Gói cơ bản",
        gia: 55000,
        giamGiaLanHai: false
    },
    promotion: {
        ten: "Gói ưu đãi cơ bản",
        gia: 100000,
        giamGiaLanHai: true
    },
    medium: {
        ten: "Gói trung bình",
        gia: 200000,
        giamGiaLanHai: true
    }
};

const gioHang = {
    basic: 0,
    promotion: 0,
    medium: 0
};

let dangKeoChat = false;
let viTriLechX = 0;
let viTriLechY = 0;
const danhSachDanhGia = [];

function dinhDangTien(soTien) {
    return soTien.toLocaleString("vi-VN") + "đ";
}

function luuGioHang() {
    try {
        localStorage.setItem("gioHangHMA", JSON.stringify(gioHang));
    } catch (loi) {
        return;
    }
}

function taiGioHang() {
    try {
        const duLieu = JSON.parse(localStorage.getItem("gioHangHMA"));

        if (!duLieu) {
            return;
        }

        for (const maGoi in gioHang) {
            const soLuong = Number(duLieu[maGoi]);

            if (soLuong >= 0) {
                gioHang[maGoi] = Math.floor(soLuong);
            }
        }
    } catch (loi) {
        return;
    }
}

function moChat() {
    const hopChat = document.querySelector("#hop_chat");
    const nutMoChat = document.querySelector("#mo_chat");

    if (hopChat) {
        hopChat.style.display = "flex";
        giuChatTrongManHinh();
    }

    if (nutMoChat) {
        nutMoChat.setAttribute("aria-expanded", "true");
    }
}

function dongChat() {
    const hopChat = document.querySelector("#hop_chat");
    const nutMoChat = document.querySelector("#mo_chat");

    if (hopChat) {
        hopChat.style.display = "none";
    }

    if (nutMoChat) {
        nutMoChat.setAttribute("aria-expanded", "false");
    }
}

function batDauKeoChat(event) {
    if (event.target.closest && event.target.closest("button")) {
        return;
    }

    const hopChat = document.querySelector("#hop_chat");

    if (!hopChat) {
        return;
    }

    const viTriChat = hopChat.getBoundingClientRect();

    dangKeoChat = true;
    viTriLechX = event.clientX - viTriChat.left;
    viTriLechY = event.clientY - viTriChat.top;

    hopChat.style.left = viTriChat.left + "px";
    hopChat.style.top = viTriChat.top + "px";
    hopChat.style.right = "auto";
    hopChat.style.bottom = "auto";

    if (event.preventDefault) {
        event.preventDefault();
    }
}

function keoChat(event) {
    if (!dangKeoChat) {
        return;
    }

    const hopChat = document.querySelector("#hop_chat");

    if (!hopChat) {
        return;
    }

    let viTriX = event.clientX - viTriLechX;
    let viTriY = event.clientY - viTriLechY;
    const gioiHanX = Math.max(0, window.innerWidth - hopChat.offsetWidth);
    const gioiHanY = Math.max(0, window.innerHeight - hopChat.offsetHeight);

    if (viTriX < 0) {
        viTriX = 0;
    }

    if (viTriY < 0) {
        viTriY = 0;
    }

    if (viTriX > gioiHanX) {
        viTriX = gioiHanX;
    }

    if (viTriY > gioiHanY) {
        viTriY = gioiHanY;
    }

    hopChat.style.left = viTriX + "px";
    hopChat.style.top = viTriY + "px";
}

function dungKeoChat() {
    dangKeoChat = false;
    giuChatTrongManHinh();
}

function giuChatTrongManHinh() {
    const hopChat = document.querySelector("#hop_chat");

    if (!hopChat || hopChat.style.display === "none") {
        return;
    }

    const viTriChat = hopChat.getBoundingClientRect();
    let viTriX = viTriChat.left;
    let viTriY = viTriChat.top;

    if (viTriChat.right > window.innerWidth) {
        viTriX = Math.max(0, window.innerWidth - hopChat.offsetWidth);
    }

    if (viTriChat.bottom > window.innerHeight) {
        viTriY = Math.max(0, window.innerHeight - hopChat.offsetHeight);
    }

    if (viTriX < 0) {
        viTriX = 0;
    }

    if (viTriY < 0) {
        viTriY = 0;
    }

    if (viTriX !== viTriChat.left || viTriY !== viTriChat.top) {
        hopChat.style.left = viTriX + "px";
        hopChat.style.top = viTriY + "px";
        hopChat.style.right = "auto";
        hopChat.style.bottom = "auto";
    }
}

function thayDoiKichThuocChat(soPixel) {
    const hopChat = document.querySelector("#hop_chat");

    if (!hopChat) {
        return;
    }

    const chieuRongLonNhat = window.innerWidth * 0.9;
    const chieuCaoLonNhat = window.innerHeight * 0.8;
    const chieuRongNhoNhat = Math.min(280, chieuRongLonNhat);
    const chieuCaoNhoNhat = Math.min(350, chieuCaoLonNhat);
    let chieuRong = hopChat.offsetWidth + soPixel;
    let chieuCao = hopChat.offsetHeight + soPixel;

    chieuRong = Math.max(chieuRongNhoNhat, Math.min(chieuRong, chieuRongLonNhat));
    chieuCao = Math.max(chieuCaoNhoNhat, Math.min(chieuCao, chieuCaoLonNhat));

    hopChat.style.width = chieuRong + "px";
    hopChat.style.height = chieuCao + "px";
    giuChatTrongManHinh();
}

function phongToChat() {
    thayDoiKichThuocChat(50);
}

function thuNhoChat() {
    thayDoiKichThuocChat(-50);
}

function themTinNhan(nguoiGui, noiDung) {
    const khungTinNhan = document.querySelector("#khung_tin_nhan");

    if (!khungTinNhan) {
        return null;
    }

    const tinNhan = document.createElement("p");
    tinNhan.textContent = noiDung;
    tinNhan.className = nguoiGui === "khach" ? "tin_khach" : "tin_bot";
    khungTinNhan.appendChild(tinNhan);
    khungTinNhan.scrollTop = khungTinNhan.scrollHeight;
    return tinNhan;
}

function botDangTraLoi(noiDung, viecTiepTheo) {
    const tinNhan = themTinNhan("bot", "Chatbot đang trả lời...");

    if (!tinNhan) {
        return;
    }

    setTimeout(function () {
        tinNhan.textContent = noiDung;

        const khungTinNhan = document.querySelector("#khung_tin_nhan");

        if (khungTinNhan) {
            khungTinNhan.scrollTop = khungTinNhan.scrollHeight;
        }

        if (viecTiepTheo) {
            viecTiepTheo();
        }
    }, 700);
}

function traLoiChat(maCauHoi) {
    const cauHoiChat = {
        chon_goi: {
            cauHoi: "Tôi nên chọn gói nào?",
            traLoi: "Bạn hãy chọn nhu cầu bên dưới để mình tư vấn chính xác hơn."
        },
        gia_goi: {
            cauHoi: "Giá các gói là bao nhiêu?",
            traLoi: "Gói cơ bản giá 55.000đ, gói ưu đãi cơ bản giá 100.000đ và gói trung bình giá 200.000đ."
        },
        dung_luong: {
            cauHoi: "Gói nào có nhiều dung lượng nhất?",
            traLoi: "Gói trung bình có dung lượng cao nhất là 20GB và có 80.000 token."
        },
        cach_mua: {
            cauHoi: "Tôi mua hàng bằng cách nào?",
            traLoi: "Bạn bấm nút mua ở gói muốn chọn, điều chỉnh số lượng rồi bấm OK mua để nhập thông tin đặt hàng."
        },
        lien_he: {
            cauHoi: "Tôi muốn liên hệ tư vấn.",
            traLoi: "Gọi trực tiếp qua số 0938508330 hoặc qua email 23137001@student.hcmus.edu.vn."
        },
        van_de_khac: {
            cauHoi: "Tư vấn sản phẩm khác ngoài bot.",
            traLoi: "Có các dịch vụ nội thất, khoá học, văn phòng ảo, phòng họp, nơi làm việc và thiết kế website."
        },
        moi_su_dung: {
            cauHoi: "Tôi mới sử dụng.",
            traLoi: "Bạn nên bắt đầu với gói cơ bản 55.000đ để trải nghiệm trước."
        },
        nhieu_dung_luong: {
            cauHoi: "Tôi cần nhiều dung lượng.",
            traLoi: "Gói trung bình phù hợp nhất vì có dung lượng 20GB."
        },
        nhieu_token: {
            cauHoi: "Tôi cần nhiều token.",
            traLoi: "Gói trung bình có 80.000 token, cao nhất trong ba gói."
        },
        tiet_kiem: {
            cauHoi: "Tôi muốn tiết kiệm.",
            traLoi: "Gói cơ bản có giá thấp nhất. Nếu mua gói ưu đãi hoặc trung bình lần thứ hai, sản phẩm thứ hai được giảm 25%."
        }
    };

    const noiDung = cauHoiChat[maCauHoi];
    const luaChonPhu = document.querySelector("#lua_chon_phu");

    if (!noiDung) {
        return;
    }

    if (luaChonPhu) {
        luaChonPhu.style.display = "none";
    }

    themTinNhan("khach", noiDung.cauHoi);

    botDangTraLoi(noiDung.traLoi, function () {
        if (maCauHoi === "chon_goi" && luaChonPhu) {
            luaChonPhu.style.display = "flex";
        }
    });
}

function tinhTienGioHang() {
    let tamTinh = 0;
    let giamGia = 0;

    for (const maGoi in gioHang) {
        const goi = danhSachGoi[maGoi];
        const soLuong = gioHang[maGoi];

        tamTinh = tamTinh + goi.gia * soLuong;

        if (goi.giamGiaLanHai && soLuong >= 2) {
            giamGia = giamGia + goi.gia * 0.25;
        }
    }

    return {
        tamTinh: tamTinh,
        giamGia: giamGia,
        tong: tamTinh - giamGia
    };
}

function themVaoGio(maGoi) {
    const goi = danhSachGoi[maGoi];

    if (!goi) {
        return;
    }

    gioHang[maGoi] = gioHang[maGoi] + 1;
    capNhatGioHang();
    themTinNhan("bot", "Đã thêm " + goi.ten + " vào giỏ hàng.");
    datLaiNutMua();
    moChat();
}

function giamSanPham(maGoi) {
    if (!danhSachGoi[maGoi] || gioHang[maGoi] <= 0) {
        return;
    }

    gioHang[maGoi] = gioHang[maGoi] - 1;
    capNhatGioHang();
    themTinNhan("bot", "Đã giảm số lượng " + danhSachGoi[maGoi].ten + ".");
    datLaiNutMua();
}

function xoaSanPham(maGoi) {
    if (!danhSachGoi[maGoi] || gioHang[maGoi] <= 0) {
        return;
    }

    gioHang[maGoi] = 0;
    capNhatGioHang();
    themTinNhan("bot", "Đã xoá " + danhSachGoi[maGoi].ten + " khỏi giỏ hàng.");
    datLaiNutMua();
}

function taoNutGioHang(noiDung, tenClass, viecCanLam) {
    const nut = document.createElement("button");
    nut.type = "button";
    nut.textContent = noiDung;
    nut.className = tenClass;
    nut.addEventListener("click", viecCanLam);
    return nut;
}

function capNhatGioHang() {
    luuGioHang();

    const danhSachMua = document.querySelector("#danh_sach_mua");
    const tamTinh = document.querySelector("#tam_tinh");
    const giamGia = document.querySelector("#giam_gia");
    const tongTien = document.querySelector("#tong_tien");

    if (!danhSachMua || !tamTinh || !giamGia || !tongTien) {
        return;
    }

    danhSachMua.innerHTML = "";
    let coSanPham = false;

    for (const maGoi in gioHang) {
        const soLuong = gioHang[maGoi];

        if (soLuong > 0) {
            const goi = danhSachGoi[maGoi];
            const dongSanPham = document.createElement("li");
            const tenSanPham = document.createElement("span");
            const dieuChinh = document.createElement("div");
            const hienThiSoLuong = document.createElement("span");

            dongSanPham.className = "dong_gio_hang";
            tenSanPham.className = "ten_san_pham";
            tenSanPham.textContent = goi.ten + " - " + dinhDangTien(goi.gia);
            dieuChinh.className = "dieu_chinh_so_luong";
            hienThiSoLuong.textContent = soLuong;

            dieuChinh.appendChild(taoNutGioHang("−", "", function () {
                giamSanPham(maGoi);
            }));
            dieuChinh.appendChild(hienThiSoLuong);
            dieuChinh.appendChild(taoNutGioHang("+", "", function () {
                themVaoGio(maGoi);
            }));
            dieuChinh.appendChild(taoNutGioHang("Xoá", "xoa_san_pham", function () {
                xoaSanPham(maGoi);
            }));

            dongSanPham.appendChild(tenSanPham);
            dongSanPham.appendChild(dieuChinh);
            danhSachMua.appendChild(dongSanPham);
            coSanPham = true;
        }
    }

    if (!coSanPham) {
        const dongTrong = document.createElement("li");
        dongTrong.textContent = "Bạn chưa chọn sản phẩm";
        danhSachMua.appendChild(dongTrong);
    }

    const tien = tinhTienGioHang();
    tamTinh.textContent = dinhDangTien(tien.tamTinh);
    giamGia.textContent = dinhDangTien(tien.giamGia);
    tongTien.textContent = dinhDangTien(tien.tong);
}

function datLaiNutMua() {
    const nutDongY = document.querySelector("#dong_y_mua");
    const formDatHang = document.querySelector("#form_dat_hang");

    if (nutDongY) {
        nutDongY.textContent = "OK mua";
        nutDongY.disabled = false;
    }

    if (formDatHang) {
        formDatHang.style.display = "none";
    }
}

function dongYMua() {
    const nutDongY = document.querySelector("#dong_y_mua");
    const formDatHang = document.querySelector("#form_dat_hang");
    const tien = tinhTienGioHang();

    if (tien.tong === 0) {
        themTinNhan("bot", "Bạn chưa chọn sản phẩm để mua.");
        return;
    }

    if (formDatHang) {
        formDatHang.style.display = "flex";
    }

    if (nutDongY) {
        nutDongY.textContent = "Nhập thông tin";
        nutDongY.disabled = true;
    }

    botDangTraLoi("Bạn hãy nhập thông tin đặt hàng rồi bấm Xác nhận đơn.");
}

function taoMaDonHang() {
    const daySo = Date.now().toString();
    return "HMA-" + daySo.slice(daySo.length - 6);
}

function xuLyDatHang(event) {
    event.preventDefault();

    const formDatHang = event.currentTarget;

    if (!formDatHang.checkValidity()) {
        formDatHang.reportValidity();
        return;
    }

    const tenKhach = document.querySelector("#ten_dat_hang").value.trim();
    const thanhToan = document.querySelector("#thanh_toan").value;
    const tien = tinhTienGioHang();

    if (tien.tong === 0) {
        themTinNhan("bot", "Giỏ hàng đang trống.");
        formDatHang.style.display = "none";
        datLaiNutMua();
        return;
    }

    const maDonHang = taoMaDonHang();
    const loiCamOn = "Cảm ơn " + tenKhach + " đã mua hàng. Mã đơn hàng: " + maDonHang + ". Tổng tiền: " + dinhDangTien(tien.tong) + ". Thanh toán: " + thanhToan + ".";

    for (const maGoi in gioHang) {
        gioHang[maGoi] = 0;
    }

    capNhatGioHang();
    formDatHang.reset();
    formDatHang.style.display = "none";
    datLaiNutMua();
    botDangTraLoi(loiCamOn);
}

function huyMua() {
    const formDatHang = document.querySelector("#form_dat_hang");

    for (const maGoi in gioHang) {
        gioHang[maGoi] = 0;
    }

    capNhatGioHang();

    if (formDatHang) {
        formDatHang.reset();
    }

    datLaiNutMua();
    themTinNhan("bot", "Đã huỷ đơn hàng.");
}

function mua_1() {
    themVaoGio("basic");
}

function mua_2() {
    themVaoGio("promotion");
}

function mua_3() {
    themVaoGio("medium");
}

function apDungCheDo() {
    const nutCheDo = document.querySelector(".doi_che_do");
    let cheDoToi = false;

    try {
        cheDoToi = localStorage.getItem("cheDoHMA") === "toi";
    } catch (loi) {
        cheDoToi = false;
    }

    document.body.classList.toggle("dark_mode", cheDoToi);

    if (nutCheDo) {
        nutCheDo.textContent = cheDoToi ? "☀️ Chế độ sáng" : "🌙 Chế độ tối";
    }
}

function doiCheDo() {
    const dangToi = document.body.classList.toggle("dark_mode");
    const nutCheDo = document.querySelector(".doi_che_do");

    if (nutCheDo) {
        nutCheDo.textContent = dangToi ? "☀️ Chế độ sáng" : "🌙 Chế độ tối";
    }

    try {
        localStorage.setItem("cheDoHMA", dangToi ? "toi" : "sang");
    } catch (loi) {
        return;
    }
}

function locSanPham() {
    const oTimKiem = document.querySelector("#tim_san_pham");
    const locGia = document.querySelector("#loc_gia");
    const locDungLuong = document.querySelector("#loc_dung_luong");
    const locToken = document.querySelector("#loc_token");
    const locUuDai = document.querySelector("#loc_uu_dai");
    const thongBaoTrong = document.querySelector("#khong_co_san_pham");

    if (!oTimKiem || !locGia || !locDungLuong || !locToken || !locUuDai) {
        return;
    }

    const sanPham = document.querySelectorAll(".danh_sach > article");
    const tuKhoa = oTimKiem.value.trim().toLowerCase();
    let soSanPhamHienThi = 0;

    sanPham.forEach(function (theSanPham) {
        const ten = theSanPham.dataset.ten;
        const gia = Number(theSanPham.dataset.gia);
        const dungLuong = theSanPham.dataset.dungLuong;
        const token = theSanPham.dataset.token;
        const uuDai = theSanPham.dataset.uuDai;
        const dungTen = ten.includes(tuKhoa);
        let dungGia = true;

        if (locGia.value === "duoi_100") {
            dungGia = gia < 100000;
        }

        if (locGia.value === "tu_100") {
            dungGia = gia >= 100000;
        }

        const dungBoNho = locDungLuong.value === "tat_ca" || locDungLuong.value === dungLuong;
        const dungToken = locToken.value === "tat_ca" || locToken.value === token;
        const dungUuDai = locUuDai.value === "tat_ca" || locUuDai.value === uuDai;
        const duocHienThi = dungTen && dungGia && dungBoNho && dungToken && dungUuDai;

        theSanPham.style.display = duocHienThi ? "flex" : "none";

        if (duocHienThi) {
            soSanPhamHienThi = soSanPhamHienThi + 1;
        }
    });

    if (thongBaoTrong) {
        thongBaoTrong.style.display = soSanPhamHienThi === 0 ? "block" : "none";
    }
}

function luuDanhGia() {
    try {
        localStorage.setItem("danhGiaHMA", JSON.stringify(danhSachDanhGia));
    } catch (loi) {
        return;
    }
}

function taiDanhGia() {
    try {
        const duLieu = JSON.parse(localStorage.getItem("danhGiaHMA"));

        if (Array.isArray(duLieu)) {
            duLieu.forEach(function (danhGia) {
                danhSachDanhGia.push(danhGia);
            });
        }
    } catch (loi) {
        return;
    }
}

function hienThiDanhGia() {
    const khuVucDanhGia = document.querySelector("#danh_sach_danh_gia");

    if (!khuVucDanhGia) {
        return;
    }

    khuVucDanhGia.innerHTML = "";

    danhSachDanhGia.forEach(function (danhGia) {
        const baiDanhGia = document.createElement("article");
        const tenKhach = document.createElement("h3");
        const soSao = document.createElement("p");
        const noiDung = document.createElement("p");

        baiDanhGia.className = "mot_danh_gia";
        tenKhach.textContent = danhGia.ten;
        soSao.textContent = "⭐".repeat(danhGia.sao);
        noiDung.textContent = danhGia.noiDung;

        baiDanhGia.appendChild(tenKhach);
        baiDanhGia.appendChild(soSao);
        baiDanhGia.appendChild(noiDung);
        khuVucDanhGia.appendChild(baiDanhGia);
    });
}

function xuLyDanhGia(event) {
    event.preventDefault();

    const formDanhGia = event.currentTarget;

    if (!formDanhGia.checkValidity()) {
        formDanhGia.reportValidity();
        return;
    }

    const danhGiaMoi = {
        ten: document.querySelector("#ten_danh_gia").value.trim(),
        sao: Number(document.querySelector("#so_sao").value),
        noiDung: document.querySelector("#noi_dung_danh_gia").value.trim()
    };

    danhSachDanhGia.unshift(danhGiaMoi);
    luuDanhGia();
    hienThiDanhGia();
    formDanhGia.reset();
}

function moXemAnh(anhDuocChon) {
    const khungXemAnh = document.querySelector("#xem_anh");
    const anhPhongTo = document.querySelector("#anh_phong_to");

    if (!khungXemAnh || !anhPhongTo) {
        return;
    }

    anhPhongTo.src = anhDuocChon.src;
    anhPhongTo.alt = anhDuocChon.alt;
    khungXemAnh.style.display = "flex";
}

function dongXemAnh() {
    const khungXemAnh = document.querySelector("#xem_anh");

    if (khungXemAnh) {
        khungXemAnh.style.display = "none";
    }
}

function xuLyNutLenDau() {
    const nutLenDau = document.querySelector(".len_dau_trang");

    if (nutLenDau) {
        nutLenDau.style.display = window.scrollY > 300 ? "block" : "none";
    }
}

function lenDauTrang() {
    window.scrollTo({
        top: 0,
        behavior: "smooth"
    });
}

function capNhatThoiGian() {
    const hienThiThoiGian = document.querySelector("#thoi_gian_hien_tai");
    const hienThiTrangThai = document.querySelector("#trang_thai_lam_viec");

    if (!hienThiThoiGian || !hienThiTrangThai) {
        return;
    }

    const bayGio = new Date();
    const thu = bayGio.getDay();
    const gio = bayGio.getHours();
    const dangLamViec = thu >= 1 && thu <= 6 && gio >= 8 && gio < 18;

    hienThiThoiGian.textContent = bayGio.toLocaleTimeString("vi-VN");
    hienThiTrangThai.textContent = dangLamViec ? "Đang trong giờ làm việc" : "Hiện đang ngoài giờ làm việc";
}

function dienThongTinGoiDaChon() {
    const thamSo = new URLSearchParams(window.location.search);
    const topicInput = document.querySelector("#topic");
    const messageInput = document.querySelector("#message");

    if (topicInput && thamSo.has("topic")) {
        topicInput.value = thamSo.get("topic");
    }

    if (messageInput && thamSo.has("message")) {
        messageInput.value = thamSo.get("message");
    }
}

function xuLyFormLienHe() {
    const form = document.querySelector(".contact_form_box form");

    if (!form) {
        return;
    }

    form.addEventListener("submit", function (event) {
        event.preventDefault();

        if (!form.checkValidity()) {
            form.reportValidity();
            return;
        }

        const hoTen = document.querySelector("#name").value.trim();
        alert("Cảm ơn " + hoTen + ". Thông tin của bạn đã được ghi nhận.");
        form.reset();
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const nutMoChat = document.querySelector("#mo_chat");
    const nutDongChat = document.querySelector("#dong_chat");
    const nutDongY = document.querySelector("#dong_y_mua");
    const nutHuyMua = document.querySelector("#huy_mua");
    const thanhChat = document.querySelector("#chat_header");
    const nutPhongTo = document.querySelector("#phong_to_chat");
    const nutThuNho = document.querySelector("#thu_nho_chat");
    const formDatHang = document.querySelector("#form_dat_hang");
    const nutCheDo = document.querySelector(".doi_che_do");
    const oTimKiem = document.querySelector("#tim_san_pham");
    const locGia = document.querySelector("#loc_gia");
    const locDungLuong = document.querySelector("#loc_dung_luong");
    const locToken = document.querySelector("#loc_token");
    const locUuDai = document.querySelector("#loc_uu_dai");
    const formDanhGia = document.querySelector("#form_danh_gia");
    const nutDongAnh = document.querySelector("#dong_xem_anh");
    const khungXemAnh = document.querySelector("#xem_anh");
    const nutLenDau = document.querySelector(".len_dau_trang");

    apDungCheDo();
    taiGioHang();
    capNhatGioHang();

    if (nutMoChat) {
        nutMoChat.setAttribute("aria-expanded", "false");
        nutMoChat.addEventListener("click", moChat);
    }

    if (nutDongChat) {
        nutDongChat.addEventListener("click", dongChat);
    }

    if (nutDongY) {
        nutDongY.addEventListener("click", dongYMua);
    }

    if (nutHuyMua) {
        nutHuyMua.addEventListener("click", huyMua);
    }

    if (thanhChat) {
        thanhChat.addEventListener("pointerdown", batDauKeoChat);
        document.addEventListener("pointermove", keoChat);
        document.addEventListener("pointerup", dungKeoChat);
    }

    if (nutPhongTo) {
        nutPhongTo.addEventListener("click", phongToChat);
    }

    if (nutThuNho) {
        nutThuNho.addEventListener("click", thuNhoChat);
    }

    if (formDatHang) {
        formDatHang.addEventListener("submit", xuLyDatHang);
    }

    if (nutCheDo) {
        nutCheDo.addEventListener("click", doiCheDo);
    }

    if (oTimKiem) {
        oTimKiem.addEventListener("input", locSanPham);
        locGia.addEventListener("change", locSanPham);
        locDungLuong.addEventListener("change", locSanPham);
        locToken.addEventListener("change", locSanPham);
        locUuDai.addEventListener("change", locSanPham);
        locSanPham();
    }

    if (formDanhGia) {
        taiDanhGia();
        hienThiDanhGia();
        formDanhGia.addEventListener("submit", xuLyDanhGia);
    }

    document.querySelectorAll(".goi_image, .gallery_grid img").forEach(function (anh) {
        anh.addEventListener("click", function () {
            moXemAnh(anh);
        });
    });

    if (nutDongAnh) {
        nutDongAnh.addEventListener("click", dongXemAnh);
    }

    if (khungXemAnh) {
        khungXemAnh.addEventListener("click", function (event) {
            if (event.target === khungXemAnh) {
                dongXemAnh();
            }
        });
    }

    if (nutLenDau) {
        nutLenDau.addEventListener("click", lenDauTrang);
    }

    window.addEventListener("resize", giuChatTrongManHinh);
    window.addEventListener("scroll", xuLyNutLenDau);
    document.addEventListener("keydown", function (event) {
        if (event.key === "Escape") {
            dongXemAnh();
        }
    });

    if (document.querySelector("#thoi_gian_hien_tai")) {
        capNhatThoiGian();
        setInterval(capNhatThoiGian, 1000);
    }
    dienThongTinGoiDaChon();
    xuLyFormLienHe();
});
