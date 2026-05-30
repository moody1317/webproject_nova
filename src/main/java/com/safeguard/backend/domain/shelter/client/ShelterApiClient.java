package com.safeguard.backend.domain.shelter.client;

import com.safeguard.backend.domain.shelter.dto.external.CivilDefenseShelterApiResponse;
import com.safeguard.backend.domain.shelter.dto.external.EarthquakeShelterApiResponse;
import com.safeguard.backend.domain.shelter.dto.external.TsunamiShelterApiResponse;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;
import tools.jackson.databind.ObjectMapper;

import java.io.BufferedReader;
import java.io.InputStreamReader;
import java.net.HttpURLConnection;
import java.net.URI;
import java.net.URL;

@Component
public class ShelterApiClient {

    private final RestTemplate restTemplate = new RestTemplate();
    private final ObjectMapper objectMapper = new ObjectMapper();

    @Value("${disaster.api.shelter.tsunami.service-key}")
    private String tsunamiServiceKey;
    @Value("${disaster.api.shelter.earthquake.service-key}")
    private String earthquakeServiceKey;
    @Value("${disaster.api.shelter.civil-defense.service-key}")
    private String civilDefenseServiceKey;

    private <T> T fetchShelters(
            String apiPath,
            String serviceKey,
            int pageNo,
            int numOfRows,
            Class<T> responseType
    ) {
        try {
            String raw = fetchRaw(apiPath, serviceKey, pageNo, numOfRows);
            return objectMapper.readValue(raw, responseType);
        } catch (Exception e) {
            throw new RuntimeException("대피소 API 호출/파싱 실패: " + apiPath, e);
        }
    }

    private String fetchRaw(
            String apiPath,
            String serviceKey,
            int pageNo,
            int numOfRows
    ) throws Exception {

        String urlString = "https://www.safetydata.go.kr" + apiPath
                + "?serviceKey=" + serviceKey
                + "&pageNo=" + pageNo
                + "&numOfRows=" + numOfRows
                + "&returnType=json";

        URL url = new URI(urlString).toURL();

        HttpURLConnection connection =
                (HttpURLConnection) url.openConnection();

        connection.setRequestMethod("GET");
        connection.setRequestProperty("User-Agent", "Mozilla/5.0");
        connection.setConnectTimeout(10000);
        connection.setReadTimeout(30000);

        try (BufferedReader reader = new BufferedReader(
                new InputStreamReader(connection.getInputStream())
        )) {
            StringBuilder sb = new StringBuilder();
            String line;

            while ((line = reader.readLine()) != null) {
                sb.append(line);
            }

            return sb.toString();
        } finally {
            connection.disconnect();
        }
    }

    public TsunamiShelterApiResponse fetchTsunamiShelters(int pageNo, int numOfRows) {
        return fetchShelters(
                "/V2/api/DSSP-IF-10944",
                tsunamiServiceKey,
                pageNo,
                numOfRows,
                TsunamiShelterApiResponse.class
        );
    }

    public EarthquakeShelterApiResponse fetchEarthquakeShelters(int pageNo, int numOfRows) {
        return fetchShelters(
                "/V2/api/DSSP-IF-10943",
                earthquakeServiceKey,
                pageNo,
                numOfRows,
                EarthquakeShelterApiResponse.class
        );
    }

    public CivilDefenseShelterApiResponse fetchCivilDefenseShelters(int pageNo, int numOfRows) {
        return fetchShelters(
                "/V2/api/DSSP-IF-10166",
                civilDefenseServiceKey,
                pageNo,
                numOfRows,
                CivilDefenseShelterApiResponse.class
        );
    }
}
