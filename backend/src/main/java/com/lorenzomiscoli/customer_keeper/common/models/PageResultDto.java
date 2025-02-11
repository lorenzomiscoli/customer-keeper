package com.lorenzomiscoli.customer_keeper.common.models;

import java.util.List;

public record PageResultDto(int currentPage, int totalPages, long totalElements, List<?> content) {
}
