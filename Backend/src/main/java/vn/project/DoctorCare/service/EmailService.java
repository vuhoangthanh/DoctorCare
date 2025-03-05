package vn.project.DoctorCare.service;

import org.springframework.beans.factory.annotation.Value;
import org.springframework.mail.javamail.JavaMailSender;
import org.springframework.mail.javamail.MimeMessageHelper;
import org.springframework.stereotype.Service;

import jakarta.mail.internet.MimeMessage;

@Service
public class EmailService {

    private final JavaMailSender emailSender;

    public EmailService(JavaMailSender emailSender) {
        this.emailSender = emailSender;
    }

    @Value("${spring.mail.username}")
    private String userName;

    public void sendSimpleMessage(String email, String name, String time, String doctorName, String address,
            String redirectLink, String language) throws Exception {
        MimeMessage message = emailSender.createMimeMessage();
        MimeMessageHelper helper = new MimeMessageHelper(message, true, "UTF-8");

        String htmlContent = this.getBodyHTMLEmail(email, name, time, doctorName, address, redirectLink, language);

        helper.setFrom(userName);
        helper.setTo(email);
        helper.setSubject("Xác nhận lịch hẹn khám bệnh của bạn");
        helper.setText(htmlContent, true);
        emailSender.send(message);
    }

    public String getBodyHTMLEmail(String email, String name, String time, String doctorName, String address,
            String redirectLink, String language) {
        String result = "";
        if ("vi".equals(language)) {
            result = " <div style='font-size: 16px; color: black; '>" +

                    "<h3>Xin chào " + name + "</h3>" +
                    "<p>Cảm ơn bạn đã sử dụng dịch vụ đặt lịch khám bệnh trực tuyến trên hệ thống <strong>DoctorsCare</strong>.</p>"
                    +
                    "<p><strong>Thông tin lịch khám của bạn:</strong></p>" +
                    "<ul>" +
                    "    <li><strong>Thời gian:</strong> " + time + "</li>" +
                    "    <li><strong>Bác sĩ:</strong> " + doctorName + "</li>" +
                    "    <li><strong>Địa chỉ:</strong> " + address + "</li>" +
                    "</ul>" +

                    "<p>Vui lòng nhấn vào đường link bên dưới để xác nhận lịch hẹn:</p>" +
                    "<div>" +
                    "<p style='text-align: center;'><a href='" + redirectLink
                    + "' style='display: inline-block; padding: 10px 20px; font-size: 18px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;'>Xác nhận lịch hẹn</a></p>"
                    +
                    "</div>" +
                    "<p><strong>Lưu ý:</strong></p>" +
                    "<ul>" +
                    "    <li>Vui lòng đến trước <strong>15 phút</strong> để hoàn tất thủ tục.</li>" +
                    "    <li>Nếu không thể đến đúng giờ, vui lòng hủy lịch hẹn hoặc liên hệ hỗ trợ.</li>" +
                    "    <li>Mọi thắc mắc xin gọi <strong>hotline: 1900 1234</strong>.</li>" +
                    "</ul>" +
                    "<p><em>DoctorsCare trân trọng cảm ơn bạn và chúc bạn nhiều sức khỏe!</em></p>" +
                    "</div>";
        }
        if ("en".equals(language)) {
            result = " <div style='font-size: 16px; color: black;'>" +

                    "<h3>Dear " + name + "</h3>" +
                    "<p>Thank you for using the online appointment booking service at <strong>DoctorsCare</strong>.</p>"
                    +
                    "<p><strong>Your appointment details:</strong></p>" +
                    "<ul>" +
                    "    <li><strong>Time:</strong> " + time + "</li>" +
                    "    <li><strong>Doctor:</strong> " + doctorName + "</li>" +
                    "    <li><strong>Address:</strong> " + address + "</li>" +
                    "</ul>" +

                    "<p>Please click the link below to confirm your appointment:</p>" +
                    "<div>" +
                    "<p style='text-align: center;'><a href='" + redirectLink
                    + "' style='display: inline-block; padding: 10px 20px; font-size: 18px; color: #fff; background-color: #007bff; text-decoration: none; border-radius: 5px;'>Confirm Appointment</a></p>"
                    +
                    "</div>" +
                    "<p><strong>Note:</strong></p>" +
                    "<ul>" +
                    "    <li>Please arrive <strong>15 minutes</strong> early to complete the check-in process.</li>"
                    +
                    "    <li>If you are unable to attend, please cancel your appointment or contact support.</li>" +
                    "    <li>For any inquiries, please call <strong>hotline: 1900 1234</strong>.</li>" +
                    "</ul>" +
                    "<p><em>DoctorsCare sincerely thanks you and wishes you good health!</em></p>" +
                    "</div>";
        }

        return result;
    }

}
