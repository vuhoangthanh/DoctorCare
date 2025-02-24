package vn.project.DoctorCare.service;

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

}
