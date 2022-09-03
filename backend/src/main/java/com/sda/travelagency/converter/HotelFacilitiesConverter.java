package com.sda.travelagency.converter;

import com.sda.travelagency.dto.AttractionDto;
import com.sda.travelagency.dto.HotelFacilitiesDto;
import com.sda.travelagency.entity.Attraction;
import com.sda.travelagency.entity.HotelFacilities;
import org.springframework.stereotype.Component;

import java.util.ArrayList;
import java.util.List;

@Component
public class HotelFacilitiesConverter implements Converter<HotelFacilities, HotelFacilitiesDto> {

    private final AttractionConverter attractionConverter;

    public HotelFacilitiesConverter(AttractionConverter attractionConverter) {
        this.attractionConverter = attractionConverter;
    }

    // till Java 8 implementation
    @Override
    public HotelFacilitiesDto fromEntityToDto(HotelFacilities entity) {
        List<AttractionDto> attractionDtos = new ArrayList<>();
        for (Attraction attraction: entity.getAttractions()) {
            AttractionDto attractionDto = attractionConverter.fromEntityToDto(attraction);
            attractionDtos.add(attractionDto);
        }

        return new HotelFacilitiesDto(attractionDtos, entity.getApartmentFacilities());
    }

    @Override
    public HotelFacilities fromDtoToEntity(HotelFacilitiesDto dto) {
        return null;
    }
}
