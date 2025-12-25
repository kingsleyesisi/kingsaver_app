import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:http/http.dart' as http;

class ApiService extends ChangeNotifier {
  // Update with your actual server URL
  final String _baseUrl = "http://your-server-ip:3000/api";

  Future<Map<String, dynamic>> getVideoInfo(String url) async {
    String endpoint = "/info"; // Default to TikTok
    
    if (url.contains("youtube.com") || url.contains("youtu.be")) {
      endpoint = "/youtube/info";
    } else if (url.contains("instagram.com")) {
      endpoint = "/instagram/info";
    } else if (url.contains("facebook.com")) {
      endpoint = "/facebook/info";
    } else if (url.contains("twitter.com") || url.contains("x.com")) {
      endpoint = "/twitter/info";
    }

    try {
      final response = await http.post(
        Uri.parse("$_baseUrl$endpoint"),
        headers: {"Content-Type": "application/json"},
        body: jsonEncode({"url": url}),
      );

      if (response.statusCode == 200) {
        return jsonDecode(response.body);
      } else {
        final error = jsonDecode(response.body);
        throw Exception(error['error'] ?? "Failed to fetch video data");
      }
    } catch (e) {
      throw Exception("Connection error: $e");
    }
  }

  // Add methods for bulk, stats etc.
}
