import 'dart:convert';
import 'package:flutter/material.dart';
import 'package:shared_preferences/shared_preferences.dart';

class HistoryItem {
  final String title;
  final String url;
  final String platform;
  final DateTime timestamp;

  HistoryItem({
    required this.title,
    required this.url,
    required this.platform,
    required this.timestamp,
  });

  Map<String, dynamic> toJson() => {
    'title': title,
    'url': url,
    'platform': platform,
    'timestamp': timestamp.toIso8601String(),
  };

  factory HistoryItem.fromJson(Map<String, dynamic> json) => HistoryItem(
    title: json['title'],
    url: json['url'],
    platform: json['platform'],
    timestamp: DateTime.parse(json['timestamp']),
  );
}

class HistoryService extends ChangeNotifier {
  List<HistoryItem> _items = [];

  List<HistoryItem> get items => _items;

  HistoryService() {
    _loadHistory();
  }

  Future<void> _loadHistory() async {
    final prefs = await SharedPreferences.getInstance();
    final String? historyJson = prefs.getString('download_history');
    if (historyJson != null) {
      final List<dynamic> decoded = jsonDecode(historyJson);
      _items = decoded.map((item) => HistoryItem.fromJson(item)).toList();
      notifyListeners();
    }
  }

  Future<void> addItem(HistoryItem item) async {
    _items.insert(0, item);
    await _saveHistory();
    notifyListeners();
  }

  Future<void> clearHistory() async {
    _items.clear();
    await _saveHistory();
    notifyListeners();
  }

  Future<void> _saveHistory() async {
    final prefs = await SharedPreferences.getInstance();
    final String encoded = jsonEncode(_items.map((e) => e.toJson()).toList());
    await prefs.setString('download_history', encoded);
  }
}
