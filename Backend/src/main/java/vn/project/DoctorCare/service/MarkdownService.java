package vn.project.DoctorCare.service;

import java.util.Optional;

import org.springframework.stereotype.Service;

import vn.project.DoctorCare.domain.Markdown;
import vn.project.DoctorCare.repository.MarkdownRepository;

@Service
public class MarkdownService {

    private final MarkdownRepository markdownRepository;

    public MarkdownService(MarkdownRepository markdownRepository) {
        this.markdownRepository = markdownRepository;
    }

    public Markdown handleAddMarkdown(Markdown markdown) {

        return this.markdownRepository.save(markdown);
    }

    public Markdown fetchMarkdownByDoctorId(long doctorId) {
        Optional<Markdown> markdown = this.markdownRepository.findByDoctorId(doctorId);

        if (markdown.isPresent()) {
            return markdown.get();
        }
        return null;
    }

    public Markdown handleUpdateMarkdown(Markdown markdown) {
        Markdown currentMarkdown = this.fetchMarkdownByDoctorId(markdown.getDoctorId());

        if (currentMarkdown != null) {
            currentMarkdown.setContentHtml(markdown.getContentHtml());
            currentMarkdown.setContentMarkdown(markdown.getContentMarkdown());
            currentMarkdown.setDescription(markdown.getDescription());
            currentMarkdown.setClinicId(markdown.getClinicId());
            currentMarkdown.setDoctorId(markdown.getDoctorId());
            currentMarkdown.setSpecialtyId(markdown.getSpecialtyId());

            System.out.println(currentMarkdown);
            this.markdownRepository.save(currentMarkdown);

            return currentMarkdown;
        }
        return currentMarkdown;
    }

}
