package vn.project.DoctorCare.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.DoctorInfo;
import vn.project.DoctorCare.domain.Markdown;
import vn.project.DoctorCare.repository.DoctorInfoRepository;
import vn.project.DoctorCare.repository.MarkdownRepository;

@Service
public class MarkdownService {

    private final MarkdownRepository markdownRepository;

    private final DoctorInfoRepository doctorInfoRepository;

    public MarkdownService(MarkdownRepository markdownRepository, DoctorInfoRepository doctorInfoRepository) {
        this.markdownRepository = markdownRepository;
        this.doctorInfoRepository = doctorInfoRepository;
    }

    public DoctorInfo handleAddDoctorInfo(DoctorInfo doctorInfo) {

        return this.doctorInfoRepository.save(doctorInfo);
    }

    public DoctorInfo handleUpdateDoctorInfo(DoctorInfo doctorInfo) {
        DoctorInfo currentDoctorInfo = this.fetchDoctorInfoByDoctorId(doctorInfo.getDoctorId());

        if (currentDoctorInfo != null) {
            currentDoctorInfo.setDoctorId(doctorInfo.getDoctorId());
            currentDoctorInfo.setPriceId(doctorInfo.getPriceId());
            currentDoctorInfo.setPaymentId(doctorInfo.getPaymentId());
            currentDoctorInfo.setProvinceId(doctorInfo.getProvinceId());
            currentDoctorInfo.setNameClinic(doctorInfo.getNameClinic());
            currentDoctorInfo.setAddressClinic(doctorInfo.getAddressClinic());
            currentDoctorInfo.setNote(doctorInfo.getNote());
            // currentDoctorInfo.setClinicId(doctorInfo.getClinicId());
            currentDoctorInfo.setSpecialtyId(doctorInfo.getSpecialtyId());

            this.doctorInfoRepository.save(currentDoctorInfo);

            return currentDoctorInfo;
        }
        return this.doctorInfoRepository.save(doctorInfo);
    }

    public DoctorInfo fetchDoctorInfoByDoctorId(long doctorId) {
        Optional<DoctorInfo> doctorInfo = this.doctorInfoRepository.findByDoctorId(doctorId);

        if (doctorInfo.isPresent()) {
            return doctorInfo.get();
        }
        return null;
    }

    public DoctorInfo handleUpSertDoctorInfo(DoctorInfo doctorInfo) {
        if (this.doctorInfoRepository.existsByDoctorId(doctorInfo.getDoctorId())) {
            return this.handleUpdateDoctorInfo(doctorInfo);
        } else {
            return this.handleAddDoctorInfo(doctorInfo);
        }
    }

    public Markdown handleAddMarkdown(Markdown markdown, DoctorInfo doctorInfo) {

        this.handleUpSertDoctorInfo(doctorInfo);

        return this.markdownRepository.save(markdown);
    }

    public Markdown fetchMarkdownByDoctorId(long doctorId) {
        Optional<Markdown> markdown = this.markdownRepository.findByDoctorId(doctorId);

        if (markdown.isPresent()) {
            return markdown.get();
        }
        return null;
    }

    public Markdown handleUpdateMarkdown(Markdown markdown, DoctorInfo doctorInfo) {
        Markdown currentMarkdown = this.fetchMarkdownByDoctorId(markdown.getDoctorId());

        if (currentMarkdown != null) {
            currentMarkdown.setContentHtml(markdown.getContentHtml());
            currentMarkdown.setContentMarkdown(markdown.getContentMarkdown());
            currentMarkdown.setDescription(markdown.getDescription());
            currentMarkdown.setClinicId(markdown.getClinicId());
            currentMarkdown.setDoctorId(markdown.getDoctorId());
            currentMarkdown.setSpecialtyId(markdown.getSpecialtyId());
            currentMarkdown.setUpdatedAt(markdown.getUpdatedAt());

            this.markdownRepository.save(currentMarkdown);
            this.handleUpSertDoctorInfo(doctorInfo);

            return currentMarkdown;
        }
        this.handleUpSertDoctorInfo(doctorInfo);

        return currentMarkdown;
    }

}
